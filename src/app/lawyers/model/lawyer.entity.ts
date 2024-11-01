export class Lawyer {
  id: number;
  name: string;
  email: string;
  password: string;
  yearsOfExperience: number;
  specialization: string;
  urlToImage: string;
  casesWon: number;
  price: string;
  phoneNumber: string;
  subscription: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.password = '';
    this.yearsOfExperience = 0;
    this.specialization = '';
    this.urlToImage = '';
    this.casesWon = 0;
    this.price = '';
    this.phoneNumber = '';
    this.subscription = '';
  }
}

