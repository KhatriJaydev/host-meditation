import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  showPassword: boolean = false;
  password: any;
  passwordStrength: number = 0;
  message: string = '';

  constructor(private router: Router, public apiService: ApiService) {}

  showEnterEmailModel: boolean = true;
  showEnterPassModel: boolean = false;

  goToenterPass() {
    if (
      this.apiService.signUpFormModel.get('firstName')?.valid &&
      this.apiService.signUpFormModel.get('lastName')?.valid &&
      this.apiService.signUpFormModel.get('email')?.valid
    ) {
      this.showEnterEmailModel = false;
      this.showEnterPassModel = true;
    } else {
      this.apiService.signUpFormModel.get('firstName')?.markAsTouched();
      this.apiService.signUpFormModel.get('lastName')?.markAsTouched();
      this.apiService.signUpFormModel.get('email')?.markAsTouched();
    }
  }

  goToSignIN() {
    this.router.navigate(['/sign-in']);
  }

  backToEnterEmail() {
    this.showEnterEmailModel = true;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  isCriteriaValid(criteria: string): boolean {
    const password = this.apiService.signUpFormModel.get('password')?.value;

    switch (criteria) {
      case 'length':
        return password!.length >= 6;
      case 'number':
        return /[0-9]/.test(password!);
      case 'uppercase':
        return /[A-Z]/.test(password!);
      case 'special':
        return /[!@#$%^&*]/.test(password!);
      default:
        return false;
    }
  }
  onPasswordChange() {
    const password = this.apiService.signUpFormModel.get('password')?.value;
    if (password === null || password === undefined) {
      return;
    }
    const criteria = {
      length: password.length >= 6,
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password),
    };

    let validCriteriaCount = 0;
    for (const criterion of Object.values(criteria)) {
      if (criterion) {
        validCriteriaCount++;
      }
    }

    this.passwordStrength = (validCriteriaCount / 4) * 100;

    if (this.passwordStrength <= 25) {
      this.message = 'Poor';
    } else if (this.passwordStrength <= 50) {
      this.message = 'Not Good';
    } else if (this.passwordStrength <= 75) {
      this.message = 'Average';
    } else {
      this.message = 'Strong';
    }
  }
  createAccount() {
    if (this.apiService.signUpFormModel.valid) {
      this.apiService.createUserAccount().subscribe(
        (response) => {
          this.router.navigate(['/sign-in']);
          console.log('user created', response);
        },
        (error) => {
          console.log('user created', error);
        }
      );
    }
  }

  ngOnInit(): void {}
}
