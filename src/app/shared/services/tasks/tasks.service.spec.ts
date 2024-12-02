import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('getTasks() deve retornar uma lista de tarefas', fakeAsync(() => {
    
    let result: any = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    })

    tick();
    expect(result).toEqual([
      { title: 'Tarefa 1', completed: false },
      { title: 'Tarefa 2', completed: true },
      { title: 'Tarefa 3', completed: false },
      { title: 'Tarefa 4', completed: true },
      { title: 'Tarefa 5', completed: false },
      { title: 'Tarefa 6', completed: true }
    ]);
  }));
});
