import { TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Task } from 'src/app/shared/interfaces/tasks.interface';
import { TestHelper } from '@testing/helpers/text-helper';
import { Component } from '@angular/core';

async function setup(fakeTask: Task) {
  
  @Component({
    standalone: true,
    imports: [ListItemComponent],
    template: `<app-list-item 
      [task]="task" 
      (complete)="onCompleteTask($event)"
      ></app-list-item>`,
  })
  class HostComponent {
    task = fakeTask;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCompleteTask() {

    }
  }

  await TestBed.configureTestingModule({
    imports: [HostComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(HostComponent);
  const testHelper = new TestHelper(fixture);

  return {fixture, testHelper};
}

describe('ListItemComponent', () => {
  it('deve renderizar o título da tarefa', async() => {
    const fakeTask: Task = {
      title: 'Item 1',
      completed: false
    };

    const {fixture, testHelper} = await setup(fakeTask);

    fixture.detectChanges();
    const textContent = testHelper.getTextContentByTestId("list-item-task-title");
    expect(textContent).toBe(fakeTask.title);
  })

  it('deve emitir um evento ao completar a tarefa', async () => {

    const fakeTask: Task = {
      title: 'Item 1',
      completed: false
    };

    const {fixture, testHelper} = await setup(fakeTask);

    const onCompleteTaskSpy = jest.spyOn(fixture.componentInstance, 'onCompleteTask');
    
    fixture.detectChanges();

    const completeBtnDebugEl = testHelper.queryByTestId('list-item-complete-action');
    completeBtnDebugEl.triggerEventHandler('click', null);

    expect(onCompleteTaskSpy).toHaveBeenCalled();
  });
});
