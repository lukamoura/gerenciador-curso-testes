import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/tasks.interface';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {

  task = input.required<Task>()
  complete = output<Task>();
  notComplete = output<Task>();

  onComplete() {
    this.complete.emit(this.task());
  }

  onMarkAsPending() {
    this.notComplete.emit(this.task());
  }
}
