import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})

export class TeamComponent {
  @Input() keys: string[] = []
  @Input() teamData: Record<string,string|number|Date|boolean> | undefined = undefined
  @Output() saved = new EventEmitter<Record<string,string|number|Date|boolean>>()
  @Output() cancelled = new EventEmitter<void>()

  getValue(event:any){
    return event.target.value
  }

  save(){
    this.saved.emit(this.teamData)
  }

  cancel(){
    this.cancelled.emit()
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('exampleModal');
    
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.onModalDismissed();
      });
    }
  }

  onModalDismissed() {
    this.cancelled.emit()
  }

  isNumber(property: string): boolean {
    const value = this.teamData?.[property]
    if(value === "" || this.isBoolean(value)) return false
    return !isNaN(value as number);
  }
  
  isBoolean(property:any): boolean{
    const value = this.teamData?.[property];
    console.log(value);
    return value === "true" || value === "false" || value === true || value === false;
  }

  isString(property: string): boolean {
    return typeof this.teamData?.[property] === 'string';
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
