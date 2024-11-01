import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LawyerProfileComponent } from './lawyer-profile.component';
import { LawyerService } from '../../services/lawyer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Lawyer } from '../../model/lawyer.entity';

describe('LawyerProfileComponent', () => {
  let component: LawyerProfileComponent;
  let fixture: ComponentFixture<LawyerProfileComponent>;
  let lawyerServiceSpy: jasmine.SpyObj<LawyerService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LawyerService', ['getLawyer']);

    await TestBed.configureTestingModule({
      declarations: [ LawyerProfileComponent ],
      providers: [
        { provide: LawyerService, useValue: spy },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } }
      ]
    }).compileComponents();

    lawyerServiceSpy = TestBed.inject(LawyerService) as jasmine.SpyObj<LawyerService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerProfileComponent);
    component = fixture.componentInstance;

    const testLawyer: Lawyer = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      yearsOfExperience: 10,
      specialization: 'Criminal Law',
      urlToImage: 'https://example.com/john.jpg',
      casesWon: 50,
      price: '$300/hour',
      phoneNumber: '+1234567890',
      subscription: 'Premium'
    };

    lawyerServiceSpy.getLawyer.and.returnValue(of(testLawyer));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lawyer profile on init', () => {
    expect(lawyerServiceSpy.getLawyer).toHaveBeenCalledWith(1);
    expect(component.lawyer.name).toBe('John Doe');
  });

  it('should close dialog', () => {
    spyOn(component.dialogRef, 'close');
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
