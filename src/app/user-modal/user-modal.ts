import { Component, Input, Output, signal, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.css'
})
export class UserModalComponent {

  roles: string[] = ['Admin', 'User', 'Manager', 'Guest'];

  // Input signal – when parent passes a user
  @Input({ required: true }) user : User = {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  };

  // Emitted when user saves or cancels
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    console.log('save');
    this.save.emit(this.user);
  }

  onCancel() {
    this.cancel.emit();
  }
}
