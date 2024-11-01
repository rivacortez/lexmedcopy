import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LawyerListComponent } from './lawyer-list.component';
import { LawyerService } from '../../../lawyers/services/lawyer.service';
import { of } from 'rxjs';
import { Lawyer } from '../../../lawyers/model/lawyer.entity';
import { MatDialogModule } from '@angular/material/dialog';

describe('LawyerListComponent', () => {
  let component: LawyerListComponent;
  let fixture: ComponentFixture<LawyerListComponent>;
  let lawyerServiceSpy: jasmine.SpyObj<LawyerService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LawyerService', ['getLawyers']);

    await TestBed.configureTestingModule({
      declarations: [ LawyerListComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: LawyerService, useValue: spy }
      ]
    }).compileComponents();

    lawyerServiceSpy = TestBed.inject(LawyerService) as jasmine.SpyObj<LawyerService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerListComponent);
    component = fixture.componentInstance;

    const testLawyers: Lawyer[] = [
      {
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
      }
    ];

    lawyerServiceSpy.getLawyers.and.returnValue(of(testLawyers));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lawyers on init', () => {
    expect(lawyerServiceSpy.getLawyers).toHaveBeenCalled();
    expect(component.lawyers.length).toBe(1);
    expect(component.lawyers[0].name).toBe('John Doe');
  });

  it('should open lawyer profile dialog', () => {
    spyOn(component.dialog, 'open');
    component.openLawyerProfile(1);
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
