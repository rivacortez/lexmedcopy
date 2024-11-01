import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lawyer } from '../../model/lawyer.entity';
import { LawyerService } from '../../services/lawyer.service';
import { firstValueFrom } from 'rxjs';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
import {FooterContentComponent} from '../../../public/components/footer-content/footer-content.component';

@Component({
  selector: 'app-lawyer-profile',
  templateUrl: './lawyer-profile.component.html',
  standalone: true,
  imports: [
    ToolbarContentComponent,
    FooterContentComponent
  ],
  styleUrls: ['./lawyer-profile.component.css']
})
export class LawyerProfileComponent implements OnInit {
  lawyer: Lawyer = new Lawyer();

  constructor(
    private lawyerService: LawyerService,
    public dialogRef: MatDialogRef<LawyerProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.loadLawyerProfile();
  }

  async loadLawyerProfile() {
    try {
      this.lawyer = await firstValueFrom(this.lawyerService.getLawyer(this.data.id));
    } catch (error) {
      console.error('Error loading lawyer profile:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
