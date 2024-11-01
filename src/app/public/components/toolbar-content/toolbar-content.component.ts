import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-toolbar-content',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.css']
})
export class ToolbarContentComponent {
  constructor(private router: Router) {}

  logout() {

    localStorage.removeItem('authToken');


    this.router.navigate(['/login']);
  }
}
