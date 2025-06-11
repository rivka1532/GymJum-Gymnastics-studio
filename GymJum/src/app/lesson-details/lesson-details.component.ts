import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Lesson } from '../models/lesson.model';

@Component({
  standalone: true,
  selector: 'app-lesson-details',
  imports: [CommonModule],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css'
})
export class LessonDetailsComponent {
  @Input() lesson!: Lesson;

  get hasStarted(): boolean {
    const today = new Date();
    const startDate = new Date(this.lesson.startDate);
    return startDate <= today;
  }
}
