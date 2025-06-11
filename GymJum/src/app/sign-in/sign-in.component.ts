import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/AuthService';
import { CookieService } from 'ngx-cookie-service';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field'; // <--- **הכי חשוב!**



@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private authService: AuthService, public router: Router, private cookieService: CookieService) {
    // Constructor logic can go here
  }

  signinForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string = '';

  signin() {
    const username = this.signinForm.get('username')?.value?.trim() || '';
    const password = this.signinForm.get('password')?.value?.trim() || '';

    this.authService.signin(username, password).subscribe({
      next: (user) => {
        console.log('המשתמש התחבר:', user);
        this.cookieService.set('role', user.role);
        if (user.role === 'gym teacher') {
          this.router.navigate(['/lessons-list']);
        } else {
          this.router.navigate(['/registration']);
        }
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
