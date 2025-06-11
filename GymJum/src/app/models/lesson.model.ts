export interface Lesson {
  id: number; // אפשרי, אם רוצים להוסיף מזהה ייחודי לכל שיעור
  title: string;
  teacher: string;
  sessions: number;
  startDate: string;  // אפשר גם Date
  price: number;
  day: string;
  time: string;
}
