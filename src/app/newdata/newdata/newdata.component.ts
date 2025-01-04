import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-newdata',
  standalone: true,
  imports: [],
  templateUrl: './newdata.component.html',
  styleUrl: './newdata.component.css'
})

export class NewDataComponent {
  @Input() keys: string[] = []
  @Input() newData: Record<string,string|number|boolean|undefined> | undefined = undefined
  @Output() saved = new EventEmitter<Record<string,string|number|boolean|undefined>>()
  @Output() cancelled = new EventEmitter<void>()

  getValue(event:any){
    return event.target.value
  }

  save(){
    this.saved.emit(this.newData)
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


  handleValueChange(property: string,event: Event){
    let newValue = this.getValue(event)
    if (newValue === "true") newValue = true
    if (newValue === "false") newValue = false
    if(!isNaN(newValue as number)) newValue = Number.parseInt(newValue)
    this.newData![property] = newValue
  }

  onModalDismissed() {
    this.cancelled.emit()
  }

  isNumber(property: string): boolean {
    const value = this.newData?.[property]
    if(value === "" || this.isBoolean(value)) return false
    return !isNaN(value as number);
  }
  
  isBoolean(property:any): boolean{
    const value = this.newData?.[property];
    return value === "true" || value === "false" || value === true || value === false;
  }

  isString(property: string): boolean {
    return typeof this.newData?.[property] === 'string';
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
