import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { of } from 'rxjs';
import { FakeTasksService } from "@testing/mocks/fake-tasks.service";
import { ListItemComponent } from './list-item/list-item.component';
import { FakeListItemComponent } from "@testing/mocks/fake-list-item.component";

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        {
          provide: TasksService,
          useClass: FakeTasksService
        }
      ]
    })

    TestBed.overrideComponent(ListComponent, {
      remove: {
        imports: [ListItemComponent]
      },
      add: {
        imports: [FakeListItemComponent]
      }
    })
    
    await TestBed.compileComponents();

    tasksService = TestBed.inject(TasksService);
  });

  it('deve listar as tarefas', () => {

    (tasksService.getAll as jest.Mock).mockReturnValue(of([
      { title: 'Tarefa 1', completed: false },
      { title: 'Tarefa 2', completed: true },
      { title: 'Tarefa 3', completed: false },
      { title: 'Tarefa 4', completed: true },
      { title: 'Tarefa 5', completed: false },
      { title: 'Tarefa 6', completed: true }
    ]));

    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();

    const todoSection = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));

    expect(todoSection).toBeTruthy();

    const todoItems = todoSection.queryAll(By.css('[data-testid="todo-list-item"]'));

    expect(todoItems.length).toBe(3);

    expect(todoItems[0].componentInstance.task()).toEqual({ title: 'Tarefa 1', completed: false });
    expect(todoItems[1].componentInstance.task()).toEqual({ title: 'Tarefa 3', completed: false });
    expect(todoItems[2].componentInstance.task()).toEqual({ title: 'Tarefa 5', completed: false });

    const completedSection = fixture.debugElement.query(By.css('[data-testid="completed-list"]'));

    expect(completedSection).toBeTruthy();

    const completedItems = completedSection.queryAll(By.css('[data-testid="completed-list-item"]'));

    expect(completedItems.length).toBe(3);

    expect(completedItems[0].componentInstance.task()).toEqual({ title: 'Tarefa 2', completed: true });
    expect(completedItems[1].componentInstance.task()).toEqual({ title: 'Tarefa 4', completed: true });
    expect(completedItems[2].componentInstance.task()).toEqual({ title: 'Tarefa 6', completed: true });
  });
});
