import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar';
import { AuthService } from '../auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {
  collapsed = false;

  constructor(public auth: AuthService, private router: Router) { }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
