import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LessonDetailsComponent } from "../lesson-details/lesson-details.component";
import { Lesson } from '../models/lesson.model';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-lessons-list',
  imports: [CommonModule, LessonDetailsComponent],
  templateUrl: './lessons-list.component.html',
  styleUrl: './lessons-list.component.css'
})
export class LessonsListComponent implements OnInit {
  lessons: Lesson[] = [];
  private lessonsSubscription?: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // הרשמה לקבלת עדכונים על השיעורים
    this.lessonsSubscription = this.dataService.lessons$.subscribe(lessons => {
      this.lessons = lessons;
    });
  }

  ngOnDestroy() {
    // ביטול ההרשמה כדי למנוע memory leaks
    if (this.lessonsSubscription) {
      this.lessonsSubscription.unsubscribe();
    }
  }

  addLesson(title: string, teacher: string, sessions: number, startDate: string, price: number, day: string, time: string) {
    this.dataService.addLesson(title, teacher, sessions, startDate, price, day, time);
  }

  deleteLesson(id: number): void {
    this.dataService.deleteLesson(id);
  }

  updateLessonTitle(id: number, newTitle: string): void {
    this.dataService.updateLessonTitle(id, newTitle);
  }
}