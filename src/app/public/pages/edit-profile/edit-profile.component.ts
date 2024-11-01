import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity} from '../../../user/model/user.entity';
import { BaseService } from '../../../shared/services/base.service';
import { firstValueFrom } from 'rxjs';
import {User} from '../../../iam/model/user';
import {MatButton} from '@angular/material/button';
import {RebaseService} from '../../../shared/services/rebase.service';
import {ToolbarContentComponent} from '../../components/toolbar-content/toolbar-content.component';
import {FooterContentComponent} from '../../components/footer-content/footer-content.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  standalone: true,
  imports: [
    MatButton,
    ToolbarContentComponent,
    FooterContentComponent,

  ],
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: UserEntity = new UserEntity();
  fileName: string | undefined;

  constructor(
    private router: Router,
    private userService: RebaseService
  ) {}

  ngOnInit() {
    this.loadUserProfile().then(r => r);
  }

  async loadUserProfile() {
    try {
      this.user = await firstValueFrom(this.userService.getCurrentUser());
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.fileName = fileList[0].name;
    } else {
      this.fileName = 'No file selected';
    }
  }

  async saveChanges() {
    try {
      this.user = await firstValueFrom(this.userService.update('users', this.user));
      await this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }

  cancelChanges() {
    this.router.navigate(['/profile']).then(r => r);
  }
}
