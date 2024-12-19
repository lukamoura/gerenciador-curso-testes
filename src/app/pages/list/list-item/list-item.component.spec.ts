import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Task } from 'src/app/shared/interfaces/tasks.interface';
import { TestHelper } from '@testing/helpers/text-helper';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let testHelper: TestHelper<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
    })
.compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    testHelper = new TestHelper(fixture);
  });

  it('deve renderizar o título da tarefa', () => {
    const fakeTask: Task = {
      title: 'Item 1',
      completed: false
    };
    fixture.componentRef.setInput('task', fakeTask);
    fixture.detectChanges();
    const textContent = testHelper.getTextContentByTestId("list-item-task-title");
    expect(textContent).toBe(fakeTask.title);
  });
});
