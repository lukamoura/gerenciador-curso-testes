import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  getAll(): Observable<Task[]> {
    return of([
      { title: 'Tarefa 1', completed: false },
      { title: 'Tarefa 2', completed: true },
      { title: 'Tarefa 3', completed: false },
      { title: 'Tarefa 4', completed: true },
      { title: 'Tarefa 5', completed: false },
      { title: 'Tarefa 6', completed: true }
    ]);
  }
}
