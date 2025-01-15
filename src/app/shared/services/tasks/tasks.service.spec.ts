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

    const request = httpTestingController.expectOne('/api/tasks');

    const fakeTasks: Task[] = [
      { id: '1', title: 'Tarefa 1', completed: false },
      { id: '2', title: 'Tarefa 2', completed: true },
      { id: '3', title: 'Tarefa 3', completed: false },
      { id: '4', title: 'Tarefa 4', completed: true },
      { id: '5', title: 'Tarefa 5', completed: false },
      { id: '6', title: 'Tarefa 6', completed: true }
    ]

    request.flush(fakeTasks);

    tick();
    expect(result).toEqual(fakeTasks);
  }));

  it('patch() deve atualizar uma tarefa', fakeAsync(() => {
    
    const fakeTask: Task = { id: '1', title: 'Tarefa 1', completed: false };

    let result: Task | null = null;

    service.patch(fakeTask.id, { completed: true }).subscribe((response) => {
      result = response;
    });
    const request = httpTestingController.expectOne((req) => {
      return req.method === 'PATCH' && req.url === `/api/tasks/1`;
    });

    const fakeResponse = { ...fakeTask, completed: true };

    request.flush(fakeResponse);

    tick();
    
    expect(result).toEqual(fakeResponse);

  }));

  it('delete() deve remover uma tarefa', fakeAsync(() => {
    
    const fakeTask: Task = { id: '1', title: 'Tarefa 1', completed: false };

    let result: Task | null = null;

    service.delete(fakeTask.id).subscribe((response) => {
      result = response;
    });
    const request = httpTestingController.expectOne((req) => {
      return req.method === 'DELETE' && req.url === `/api/tasks/1`;
    });

    request.flush(fakeTask);

    tick();
    
    expect(result).toEqual(fakeTask);

  }));
});
