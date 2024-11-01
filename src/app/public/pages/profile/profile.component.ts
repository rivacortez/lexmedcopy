import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../user/model/user.entity';
import { firstValueFrom } from 'rxjs';
import { RebaseService } from '../../../shared/services/rebase.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToolbarContentComponent } from '../../components/toolbar-content/toolbar-content.component';
import { FooterContentComponent } from '../../components/footer-content/footer-content.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ToolbarContentComponent,
    FooterContentComponent
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserEntity = new UserEntity();
  isEditMode: boolean = false;

  constructor(private userService: RebaseService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.user = await firstValueFrom(this.userService.getCurrentUser());
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  async saveChanges() {
    try {
      this.user = await firstValueFrom(this.userService.update('users', this.user));
      this.isEditMode = false;
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }

  isLawyer(): boolean {
    return this.user.userType === 'lawyer';
  }

  isDoctor(): boolean {
    return this.user.userType === 'doctor';
  }
}
