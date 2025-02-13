import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTaskComponent } from './create-task.component';
import { TestHelper } from '@testing/helpers/text-helper';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { FakeTasksService } from '@testing/mocks/fake-tasks.service';
import { Router } from '@angular/router';
import { Task, TaskWithoutId } from 'src/app/shared/interfaces/tasks.interface';
import { of } from 'rxjs';
import { MockProvider } from 'ng-mocks';

describe('CreateTaskComponent', () => {
  let fixture: ComponentFixture<CreateTaskComponent>;
  let testHelper: TestHelper<CreateTaskComponent>;
  let tasksService: TasksService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskComponent],
      providers: [MockProvider(TasksService)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskComponent);
    testHelper = new TestHelper(fixture);

    tasksService = TestBed.inject(TasksService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('deve criar uma tarefa', () => {
    const fakeTaskTitle = 'Fake Task Title';

    const fakeTaskPayload: TaskWithoutId = {title: fakeTaskTitle, completed: false};

    const fakeTaskResponse: Task = {id: '1', ...fakeTaskPayload};

    (tasksService.post as jest.Mock).mockReturnValue(of(fakeTaskResponse));

    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');

    const titleDebugEl = testHelper.queryByTestId('create-task-title');

    titleDebugEl.triggerEventHandler('input', { target: { value: fakeTaskTitle } });

    fixture.detectChanges();   

    const formDebugEl = testHelper.queryByTestId('create-task-form');
    
    formDebugEl.triggerEventHandler('submit', null); 
   
    expect(tasksService.post).toHaveBeenCalledWith(fakeTaskPayload);

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/');
  });
});
