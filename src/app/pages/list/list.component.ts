import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/tasks.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { NoItemsComponent } from './no-items/no-items.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NoItemsComponent],
templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {

  tasksService = inject(TasksService);
  tasks = signal<Task[]>([]);

  pending = computed(() => this.tasks().filter(task => !task.completed));
  completedTasks = computed(() => this.tasks().filter(task => task.completed));

  ngOnInit(): void {
    this.tasksService.getAll().subscribe(tasks => this.tasks.set(tasks));
  }
}
