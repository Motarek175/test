import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../user-auth.service';
import { signUp } from '../../user-interface';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(public _UserAuthService: UserAuthService,private _Router:Router) {}
  matching: boolean = false;
  signUpForm = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
      ),
    ]),
    confPass: new FormControl('', [
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
      ),
    ]),
  });
  checkMatches() {
    if (
      this.signUpForm.get('password')?.value ==
      this.signUpForm.get('confPass')?.value
    ) {
      this.matching = true;
    } else {
      this.matching = false;
    }
  }
  signUp() {
    const signUpData: signUp = {
      fullName: this.signUpForm.get('fullname')?.value || '',
      userName: this.signUpForm.get('username')?.value || '',
      email: this.signUpForm.get('email')?.value || '',
      password: this.signUpForm.get('password')?.value || '',
      confirmPassword: this.signUpForm.get('confPass')?.value || '',
    };
    this._UserAuthService.SignUp(signUpData).subscribe({
      next: (res) => {
        console.log(res);
        this._Router.navigate(['/signin']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
