export class User {
  name: string;
  specialization: string;
  email: string;
  password: string;

  constructor(name: string, specialization: string, email: string, password: string) {
    this.name = name || '';
    this.specialization = specialization || '';
    this.email = email || '';
    this.password = password || '';
  }
}
