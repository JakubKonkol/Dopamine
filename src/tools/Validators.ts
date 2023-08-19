export class Validators{
  static validateEmail(email: string): boolean{
    return email.includes('@');
  }
  static validatePassword(password: string): boolean{
    return password.length > 5;
  }

  static validateUsername(username: string): boolean{
    return username.length > 3;
  }
}
