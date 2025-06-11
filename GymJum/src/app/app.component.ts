import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from './AuthService';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; // עבור סרגל הניווט (toolbar)
import { MatButtonModule } from '@angular/material/button'; // עבור כפתורים
import { MatCardModule } from '@angular/material/card'; // עבור כרטיס התחברות
import { MatFormFieldModule } from '@angular/material/form-field'; // עבור שדות קלט
import { MatInputModule } from '@angular/material/input'; // עבור שדות קלט
import { MatIconModule } from '@angular/material/icon'; // עבור אייקונים

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'GymJum';
  showNav = true;
  currentRoute: string = '';

  constructor(
    public authService: AuthService, // 🟢 זה חייב להיות public כדי שתוכלי לגשת אליו ב־HTML
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/signup'];
        this.showNav = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
  }

  shouldShowNav(): boolean {
    // לדוגמה: להסתיר בעמוד התחברות בלבד
    return this.currentRoute !== '/login' && this.currentRoute !== '/' && this.currentRoute !== '';
  }

  signOut(): void {
    // קרא לפונקציה מהסרוויס
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  signIn(): void {
    // כאן תוכל להוסיף לוגיקה להתחברות, אם יש צורך
    this.router.navigate(['/']);
  }

  isHome(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }
}

