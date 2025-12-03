import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {

  userList: User[] = [];
  searchText = '';
  page = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.pageSize, this.searchText)
      .subscribe(result => {
        this.userList = result.users;
        this.totalCount = result.totalCount;
      });
  }

  search() {
    this.page = 1;   // reset to first page
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
}
