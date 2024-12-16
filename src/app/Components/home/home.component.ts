import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../user-auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private _UserAuthService: UserAuthService,
    private _Router: Router
  ) {
    if (this._UserAuthService.isuserlogin.value == false) {
      this._Router.navigate(['/signin']);
    }
  }
}
