import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LawyerService } from './lawyer.service';
import { Lawyer } from '../model/lawyer.entity';
import { environment } from '../../../environments/environment';

describe('LawyerService', () => {
  let service: LawyerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LawyerService]
    });
    service = TestBed.inject(LawyerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get lawyers', () => {
    const mockLawyers: Lawyer[] = [
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

    service.getLawyers().subscribe(lawyers => {
      expect(lawyers).toEqual(mockLawyers);
    });

    const req = httpMock.expectOne(`${environment.serverBasePath}/lawyers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLawyers);
  });

  it('should get a lawyer by id', () => {
    const mockLawyer: Lawyer = {
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

    service.getLawyer(1).subscribe(lawyer => {
      expect(lawyer).toEqual(mockLawyer);
    });

    const req = httpMock.expectOne(`${environment.serverBasePath}/lawyers/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLawyer);
  });

  it('should update a lawyer', () => {
    const mockLawyer: Lawyer = {
      id: 1,
      name: 'John Doe Updated',
      email: 'john@example.com',
      password: 'newpassword123',
      yearsOfExperience: 11,
      specialization: 'Criminal Law',
      urlToImage: 'https://example.com/john-updated.jpg',
      casesWon: 55,
      price: '$350/hour',
      phoneNumber: '+1234567890',
      subscription: 'Gold'
    };

    service.updateLawyer(mockLawyer).subscribe(lawyer => {
      expect(lawyer).toEqual(mockLawyer);
    });

    const req = httpMock.expectOne(`${environment.serverBasePath}/lawyers/${mockLawyer.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockLawyer);
  });
});
