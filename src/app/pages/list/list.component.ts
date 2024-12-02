import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {

  tasks = signal<Task[]>([
    { title: 'Tarefa 1', completed: false },
    { title: 'Tarefa 2', completed: true },
    { title: 'Tarefa 3', completed: false },
    { title: 'Tarefa 4', completed: true },
    { title: 'Tarefa 5', completed: false },
    { title: 'Tarefa 6', completed: true },
  ]);

  pending = computed(() => this.tasks().filter(task => !task.completed));
  completedTasks = computed(() => this.tasks().filter(task => task.completed));
}
