import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../user';
import { UserModalComponent } from '../../user-modal/user-modal'; 

import { LoaderService } from '../../loader/loader.service';
import { ToastService} from '../../toast/toast.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, UserModalComponent],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {
    
  EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

  userList: User[] = [];
  searchText = '';
  page = 1;
  pageSize = 10;
  totalCount = 0;

  sortBy: string = 'firstName';
  sortOrder : 'asc' | 'desc' = 'asc';

  showModal = signal(false);
  selectedUser = signal<User>(this.emptyUser());

  constructor(private userService: UserService, private toast: ToastService, private loader: LoaderService) { }

  ngOnInit() {
    this.loader.show();
    this.loadUsers();
    this.loader.hide();
  }

  emptyUser(): User {
    return { id: this.EMPTY_GUID, firstName: '', lastName: '', email: '', role: '' };
  }

  openAdd() {
    this.selectedUser.set(this.emptyUser());
    this.showModal.set(true);
  }

  openEdit(user: User) {
    this.selectedUser.set({ ...user });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  handleSave(userData: User | null) {
    if (!userData) return;

    const isUpdate = userData.id && userData.id !== this.EMPTY_GUID;
    this.loader.show();

    const request = isUpdate
      ? this.userService.updateUser(userData)
      : this.userService.addUser(userData);

    request.subscribe({
      next: () => {
        this.toast.success(
          isUpdate ? 'User updated successfully' : 'User added successfully'
        );
        this.closeModal();
        this.loadUsers();
        this.loader.hide();
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err?.error?.message || 'Operation failed');
        this.loader.hide();
      }
    });
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.pageSize, this.searchText, this.sortBy, this.sortOrder)
      .subscribe(result => {
        this.userList = result.users;
        this.totalCount = result.totalCount;
      });
  }

  search() {
    this.page = 1;
    this.loadUsers();
  }

  nextPage() {
    if (this.page * this.pageSize < this.totalCount) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }

  sortData(sortField: string = 'email') {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortBy = sortField;
    this.loadUsers();
  }
}
