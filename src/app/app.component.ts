import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { NewDataComponent } from "./newdata/newdata/newdata.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'jsondb-editor';

  data: Record<string,string|number|boolean|undefined>[] = []
  keys: string[] = []
  newData: Record<string,string|number|boolean|undefined> | undefined = undefined
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
          this.data = response;
          this.keys = Object.keys(this.data[0])
        },
        error: error => console.log(error)
      }
    )
  }



  updateReg(registration: Record<string,string|number|boolean|undefined>) {
    this.update = {...registration};
  }

  deleteReg(registration: Record<string,string|number|boolean|undefined>) {
    this.dataService.deleteRegistration(registration["id"] as number).subscribe({
      next: response =>{
        this.data = this.data.filter(r=>r["id"]!= response["id"])
        this.newData = undefined
      },
      error: error => console.log(error)
    })
  }

  newReg(){
    this.newData = {}
    this.keys.forEach(key=>{
      if(key==="id" || key==="_id") this.newData![key] = undefined
      else if(this.isNumber(this.data[0][key])) this.newData![key] = 0
      else if (this.isValidDate(this.data[0][key])) this.newData![key] = new Date().toJSON().slice(0,10).replace(/-/g,'-')
      else if(this.isBoolean(this.data[0][key])) this.newData![key] = false
      else if (this.isString(this.data[0][key])){
        this.newData![key] = ""
      }
    })
  }

  save(reg: Record<string,string|number|boolean|undefined>){
    if(this.newData != undefined){
      this.dataService.addRegistration(reg).subscribe({
        next: response =>{
          this.data.push(response)
          this.newData = undefined
        },
        error: error => console.log(error)
      })
    }
    else{
      this.dataService.updateRegistration(reg).subscribe({
        next: response =>{
          const updatedIndex = this.data.findIndex(r=>r["id"]===response["id"])
          this.data[updatedIndex] = response
          this.update = undefined
        },
        error: error => console.log(error)
      })
    }
  }

  cancel(){
    this.newData = undefined
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
