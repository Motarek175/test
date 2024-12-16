import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserAuthService } from '../../user-auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { signIn } from '../../user-interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(
    private _UserAuthService: UserAuthService,
    private _Router: Router
  ) {}
  loginform = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    const logindata: signIn = {
      userName: this.loginform.get('email')?.value || '',
      password: this.loginform.get('password')?.value || '',
    };
    this._UserAuthService.SignIn(logindata).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'Login successful.') {
          this._Router.navigate(['/home']);
          this._UserAuthService.isuserlogin.next(true);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
