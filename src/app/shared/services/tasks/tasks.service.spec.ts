import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { Task } from '../../interfaces/tasks.interface';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TasksService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getTasks() deve retornar uma lista de tarefas', fakeAsync(() => {
    
    let result: Task[] | null = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    })

    const request = httpTestingController.expectOne('/tasks');

    const fakeTasks: Task[] = [
      { title: 'Tarefa 1', completed: false },
      { title: 'Tarefa 2', completed: true },
      { title: 'Tarefa 3', completed: false },
      { title: 'Tarefa 4', completed: true },
      { title: 'Tarefa 5', completed: false },
      { title: 'Tarefa 6', completed: true }
    ]

    request.flush(fakeTasks);

    tick();
    expect(result).toEqual(fakeTasks);
  }));
});
