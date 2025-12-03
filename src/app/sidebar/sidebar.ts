import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: '🏠', route: '/dashboard' },
    { label: 'Users', icon: '👤', route: '/dashboard/users' },
    { label: 'Settings', icon: '⚙️', route: '/dashboard/settings' }
  ];
}
