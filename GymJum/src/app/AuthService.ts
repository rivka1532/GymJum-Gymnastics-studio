  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { CookieService } from 'ngx-cookie-service';
  import { map } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient, private cookieService: CookieService) {}

    signin(username: string, password: string) {
      return this.http.get<any[]>(this.apiUrl).pipe(
        // סימולציה לבדיקה
        map(users => {
          const user = users.find(u => u.username === username.trim());
          console.log('משתמשים שנמצאו:', users);
          console.log('משתמש שנמצא:', user);
          if (user) {
            // מוסיפים תפקיד דמיוני
            user.role = (user.id % 2 === 0) ? 'gym teacher' : 'registration'; // סתם דוגמה
            if (password === user.name) {  // סיסמה דמה
              return user;
            } else {
              throw new Error('סיסמה שגויה');
            }
          } else {
            throw new Error('משתמש לא נמצא');
          }
        })
      );
    }

    signOut(): void {
      this.cookieService.delete('role');
      // this.cookieService.delete('username');
      console.log('משתמש התנתק בהצלחה');
    }

    getUserRole(): string | null {
      return this.cookieService.get('role') || null;
    }

    isAuthorized(requiredRole: string): boolean {
      const role = this.getUserRole()
      console.log('בדיקת הרשאה: ', role, 'צריך:', requiredRole);
      return this.getUserRole() === requiredRole;
    }

  }
