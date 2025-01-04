import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { TeamComponent } from "./team/team/team.component";
import { isValidDate } from 'rxjs/internal/util/isDate';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'WRO';

  registrations: Record<string,string|number|Date|boolean>[] = []
  keys: string[] = []
  newTeam: Record<string,string|number|Date|boolean> | undefined = undefined
  update: any
  
  constructor(private dataService: DataService){
    // this.newReg()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.dataService.getRegistrations().subscribe(
      {
        next: response => {
          this.registrations = response;
          this.keys = Object.keys(this.registrations[0])
        },
        error: error => console.log(error)
      }
    )
  }



  updateReg(registration: Record<string,string|number|Date|boolean>) {
    this.update = {...registration};
  }

  deleteReg(registration: Record<string,string|number|Date|boolean>) {
    this.dataService.deleteRegistration(registration["id"] as number).subscribe({
      next: response =>{
        this.registrations = this.registrations.filter(r=>r["id"]!= response["id"])
        this.newTeam = undefined
      },
      error: error => console.log(error)
    })
  }

  newReg(){
    this.newTeam = {}
    this.keys.forEach(key=>{
      if(this.isNumber(this.registrations[0][key])&&key!=="id") this.newTeam![key] = 0
      else if (this.isValidDate(this.registrations[0][key])) this.newTeam![key] = new Date().toJSON().slice(0,10).replace(/-/g,'-')
      else if(this.isBoolean(this.registrations[0][key])) this.newTeam![key] = false
      else if (this.isString(this.registrations[0][key])&&key!=="id"){
        this.newTeam![key] = ""
      }
    })
  }

  save(reg: Record<string,string|number|Date|boolean>){
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
          const updatedIndex = this.registrations.findIndex(r=>r["id"]===response["id"])
          this.registrations[updatedIndex] = response
          this.update = undefined
        },
        error: error => console.log(error)
      })
    }
  }

  cancel(){
    this.newTeam = undefined
    this.update = undefined
    console.log("cancelled")
  }

  isNumber(string: any): boolean {
    if(string === "" || this.isBoolean(string)) return false
    return !isNaN(string as number);
  }

  isBoolean(string:any): boolean{
    return string === "true" || string === "false" || string === true || string === false;
  }

  isString(string: any): boolean {
    return typeof string === 'string';
  }
  

  isValidDate(dateString: any): boolean {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!iso8601Regex.test(dateString)) {
        return false; 
    }

    const date = new Date(dateString);
    return !isNaN(date.getTime()); 
}
}
