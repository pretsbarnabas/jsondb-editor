import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registration } from '../models/registration.model';
import { DataService } from './services/data.service';
import { TeamComponent } from "./team/team/team.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'WRO';
  
  registrations: Registration[] = []
  newTeam: Registration | undefined = undefined
  update: any
  constructor(private dataService: DataService){
    this.newReg()    
  }
  
  ngOnInit(): void {
    this.dataService.getRegistrations().subscribe(
      {
        next: response => this.registrations = response,
        error: error => console.log(error)
      }
    )
    
  }

  updateReg(registration: Registration) {
    this.update = JSON.parse(JSON.stringify(registration));
  }

  deleteReg(registration: Registration) {
    this.dataService.deleteRegistration(registration.id!).subscribe({
      next: response =>{
        this.registrations = this.registrations.filter(r=>r.id != response.id)
        this.newTeam = undefined
      },
      error: error => console.log(error)
    })
  }

  newReg(){
    this.newTeam = {
      id: undefined,
      teamLeader: "",
      teamName: "",
      teamLeaderEmail: "",
      teamLeaderBirthDate: "",
      category: "",
      memberCount: 0

    }
  }

  save(reg: Registration){
    if(this.newTeam != undefined){
      this.dataService.addRegistration(reg).subscribe({
        next: response =>{
          this.registrations.push(response)
          this.newTeam = undefined
        },
        error: error => console.log(error)
      })
    }
    else{
      this.dataService.updateRegistration(reg).subscribe({
        next: response =>{
          const updatedIndex = this.registrations.findIndex(r=>r.id===response.id)
          this.registrations[updatedIndex] = response
          this.update = undefined
        },
        error: error => console.log(error)
      })
    } 
  }
}
