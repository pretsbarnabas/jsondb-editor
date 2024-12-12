import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registration } from '../models/registration.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'WRO';

  registrations: Registration[] = []

  constructor(private dataService: DataService){

  }

  ngOnInit(): void {
    this.dataService.getRegistrations().subscribe(
      {
        next: response => this.registrations = response,
        error: error => console.log(error)
      }
      )

  }

}
