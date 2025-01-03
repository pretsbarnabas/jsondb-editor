import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Registration } from '../../../models/registration.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})

export class TeamComponent {
  @Input() teamData: Registration | undefined = undefined
  @Output() saved = new EventEmitter<Registration>()
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
}
