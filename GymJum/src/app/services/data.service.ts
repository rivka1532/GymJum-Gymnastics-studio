import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from '../models/lesson.model';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root' // השירות זמין לכל האפליקציה
})
export class DataService {
  private registrantsSource = new BehaviorSubject<any[]>([]);
  registrations$ = this.registrantsSource.asObservable();

  private lessonsSource = new BehaviorSubject<any[]>([]);
  lessons$ = this.lessonsSource.asObservable();

  private lessonsStorageKey = 'myLessonsData';
  private registrationsStorageKey = 'myRegistrationsData';

  constructor() {
    // טען את השיעורים בעת אתחול השירות
    this.loadDatatFromStorage();
    // this.loadRegistrationsFromStorage();
  }

  // טעינת נתונים מ-localStorage
  private loadDatatFromStorage() {
    const storedLessons = localStorage.getItem(this.lessonsStorageKey);
    if (storedLessons) {
      try {
        const lessons = JSON.parse(storedLessons);
        this.lessonsSource.next(lessons);
      } catch (e) {
        console.error('Error parsing stored lessons:', e);
        this.initializeDefaultData();
      }
    } else {
      this.initializeDefaultData();
    }
    const storedRegistrations = localStorage.getItem(this.registrationsStorageKey);
    if (storedRegistrations) {
      try {
        const registrations = JSON.parse(storedRegistrations);
        this.registrantsSource.next(registrations);
      } catch (e) {
        console.error('Error parsing stored registrations:', e);
        this.initializeDefaultData();
      }
    } else {
      this.initializeDefaultData();
    }
  }

  // אתחול נתונים ברירת מחדל
  private initializeDefaultData() {
    const defaultLessons: Lesson[] = [
      { id: 1, title: 'יוגה למתחילים', teacher: 'שרה כהן', sessions: 10, startDate: '2025-05-20', price: 300, day: 'ראשון', time: '18:00' },
      { id: 2, title: 'פילאטיס למתקדמים', teacher: 'רונית לוי', sessions: 12, startDate: '2025-06-10', price: 400, day: 'שלישי', time: '19:30' },
      { id: 3, title: 'חיזוק עמוד שדרה', teacher: 'דנה ישראלי', sessions: 8, startDate: '2025-05-01', price: 250, day: 'חמישי', time: '17:00' },
      { id: 4, title: 'אירובי כיף', teacher: 'מיכל ברק', sessions: 15, startDate: '2025-05-28', price: 350, day: 'רביעי', time: '20:00' },
      { id: 5, title: 'זומבה עם אנרגיה', teacher: 'ליאת נחום', sessions: 10, startDate: '2025-06-05', price: 300, day: 'שני', time: '19:00' },
      { id: 6, title: 'חיטוב ועיצוב הגוף', teacher: 'הילה כהן', sessions: 12, startDate: '2025-04-15', price: 450, day: 'שלישי', time: '18:30' },
      { id: 7, title: 'פילאטיס הריון', teacher: 'רונית לוי', sessions: 8, startDate: '2025-06-12', price: 300, day: 'רביעי', time: '17:00' }
    ];
    this.lessonsSource.next(defaultLessons);
    this.saveLessonsToStorage(defaultLessons);
    const defaultRegistrations: Registration[] = [
      { firstName: 'נועה', lastName: 'שגב', phone: '052-4960499', idNumber: '978857510', lesson: 'יוגה למתחילים', price: 300, paid: true },
      { firstName: 'אור', lastName: 'אביטל', phone: '050-6225749', idNumber: '425419340', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
      { firstName: 'מאיה', lastName: 'אליהו', phone: '058-7571059', idNumber: '970316772', lesson: 'יוגה למתחילים', price: 300, paid: true },
      { firstName: 'נועה', lastName: 'שגב', phone: '054-6967309', idNumber: '818419525', lesson: 'יוגה למתחילים', price: 300, paid: true },
      { firstName: 'רותם', lastName: 'אליהו', phone: '058-6976031', idNumber: '403524540', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
      { firstName: 'ליטל', lastName: 'שמרון', phone: '052-6385105', idNumber: '670200252', lesson: 'פילאטיס למתקדמים', price: 400, paid: true },
      { firstName: 'תמר', lastName: 'בן-שמשון', phone: '058-5791625', idNumber: '285685825', lesson: 'חיזוק עמוד שדרה', price: 250, paid: false },
      { firstName: 'איילת', lastName: 'אליהו', phone: '058-8007688', idNumber: '711245753', lesson: 'פילאטיס למתקדמים', price: 400, paid: false },
      { firstName: 'אלונה', lastName: 'מלכה', phone: '054-9432185', idNumber: '576265988', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
      { firstName: 'תמר', lastName: 'תמרי', phone: '054-8710713', idNumber: '727329426', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
      { firstName: 'גל', lastName: 'רוזנבלום', phone: '050-7260330', idNumber: '958023779', lesson: 'יוגה למתחילים', price: 300, paid: true },
      { firstName: 'רותם', lastName: 'זוהר', phone: '050-9824116', idNumber: '827394888', lesson: 'פילאטיס למתקדמים', price: 400, paid: true },
      { firstName: 'אורנה', lastName: 'ברק', phone: '054-8201039', idNumber: '387602366', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
      { firstName: 'ליטל', lastName: 'כהן', phone: '050-5294123', idNumber: '796559495', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
      { firstName: 'רות', lastName: 'דוד', phone: '050-1358918', idNumber: '226935396', lesson: 'חיזוק עמוד שדרה', price: 250, paid: true },
      { firstName: 'רחל', lastName: 'גולדשטיין', phone: '058-9518118', idNumber: '351376100', lesson: 'חיזוק עמוד שדרה', price: 250, paid: true },
      { firstName: 'גל', lastName: 'דוד', phone: '054-5192526', idNumber: '300983486', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
      { firstName: 'רחל', lastName: 'לוי', phone: '058-1388195', idNumber: '493708053', lesson: 'יוגה למתחילים', price: 300, paid: true },
      { firstName: 'ענבר', lastName: 'אביטל', phone: '054-3467572', idNumber: '026571819', lesson: 'פילאטיס למתקדמים', price: 400, paid: true },
      { firstName: 'אור', lastName: 'בן-שמשון', phone: '058-6424216', idNumber: '749877313', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
      { firstName: 'רותם', lastName: 'ברק', phone: '050-1857373', idNumber: '499102196', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
      { firstName: 'אורית', lastName: 'תמרי', phone: '058-8821252', idNumber: '619652926', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: true },
      { firstName: 'אור', lastName: 'לוי', phone: '052-8648153', idNumber: '680586690', lesson: 'יוגה למתחילים', price: 300, paid: true },
      { firstName: 'איילת', lastName: 'זוהר', phone: '050-9059129', idNumber: '200649252', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: true },
      { firstName: 'מיה', lastName: 'מלכה', phone: '050-3781070', idNumber: '718855322', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
      { firstName: 'אלונה', lastName: 'אליהו', phone: '058-4373326', idNumber: '835421172', lesson: 'חיזוק עמוד שדרה', price: 250, paid: false },
      { firstName: 'רותם', lastName: 'בן-שמשון', phone: '054-5929720', idNumber: '162016684', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: true }
    ];
    this.registrantsSource.next(defaultRegistrations);
    this.saveRegistrationsToStorage(defaultRegistrations);
  }

  // שמירה ל-localStorage
  private saveLessonsToStorage(lessons: Lesson[]) {
    localStorage.setItem(this.lessonsStorageKey, JSON.stringify(lessons));
    console.log('Lessons saved to Local Storage:', lessons);
  }

  private saveRegistrationsToStorage(registrations: Registration[]) {
    localStorage.setItem(this.registrationsStorageKey, JSON.stringify(registrations));
    console.log('Lessons saved to Local Storage:', registrations);
  }

  // קבלת השיעורים הנוכחיים
  getCurrentLessons(): Lesson[] {
    return this.lessonsSource.value;
  }

  getCurrentRegistartion(): Registration[] {
    return this.registrantsSource.value;
  }

  // עדכון רשימת השיעורים
  setLessons(lessons: Lesson[]) {
    this.lessonsSource.next(lessons);
    this.saveLessonsToStorage(lessons);
  }

  setRegistrations(registrations: Registration[]) {
    this.registrantsSource.next(registrations);
    this.saveRegistrationsToStorage(registrations);
  }

  // הוספת שיעור חדש
  addLesson(title: string, teacher: string, sessions: number, startDate: string, price: number, day: string, time: string) {
    const currentLessons = this.getCurrentLessons();
    const newId = currentLessons.length > 0 ? Math.max(...currentLessons.map(l => l.id)) + 1 : 1;
    const newLesson: Lesson = { id: newId, title, teacher, sessions, startDate, price, day, time };

    const updatedLessons = [...currentLessons, newLesson];
    this.setLessons(updatedLessons);
  }

  addRegistration(firstName: string, lastName: string, phone: string, idNumber: string, lesson: string, price: number, paid: boolean) {
    const CurrentRegistartion = this.getCurrentRegistartion();
    // const newId = currentLessons.length > 0 ? Math.max(...currentLessons.map(l => l.id)) + 1 : 1;
    const newRegistration: Registration = { firstName, lastName, phone, idNumber, lesson, price, paid };

    const updatedRegistrations = [...CurrentRegistartion, newRegistration];
    this.setRegistrations(updatedRegistrations);
  }

  // מחיקת שיעור
  deleteLesson(id: number) {
    const currentLessons = this.getCurrentLessons();
    const updatedLessons = currentLessons.filter(l => l.id !== id);
    this.setLessons(updatedLessons);
  }

  deleteRegistration(id: string) {
    const currentRegistartion = this.getCurrentRegistartion();
    const updatedRegistrations = currentRegistartion.filter(r => r.idNumber !== id);
    this.setRegistrations(updatedRegistrations);
  }

  // עדכון כותרת שיעור
  updateLessonTitle(id: number, newTitle: string) {
    const currentLessons = this.getCurrentLessons();
    const updatedLessons = currentLessons.map(lesson =>
      lesson.id === id ? { ...lesson, title: newTitle } : lesson
    );
    this.setLessons(updatedLessons);
  }

  // עבור registrants (אם צריך)
  setRegistrants(data: any[]) {
    this.registrantsSource.next(data);
  }
}
