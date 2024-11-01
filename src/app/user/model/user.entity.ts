export class UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: string;
  subscription: string | undefined;
  urlToImage: string;
  yearsOfExperience?: number;
  casesWon?: number;
  price?: string;
  consultationsCompleted?: number;
  specialization?: string;
  place?: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.password = '';
    this.userType = 'lawyer';
    this.urlToImage = '/assets/img/User.png';
  }
}
