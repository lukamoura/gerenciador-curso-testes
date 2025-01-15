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
      (notComplete)="onNotComplete($event)"
      (remove)="onRemove($event)"
      ></app-list-item>`,
  })
  class HostComponent {
    task = fakeTask;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCompleteTask() {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onNotComplete() {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onRemove(task: Task) {}
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
      id: '1',
      title: 'Item 1',
      completed: false
    };

    const {fixture, testHelper} = await setup(fakeTask);

    fixture.detectChanges();
    const textContent = testHelper.getTextContentByTestId("list-item-task-title");
    expect(textContent).toBe(fakeTask.title);
  })

  describe('quando a tarefa não estiver concluída', () => {
    
    it('deve renderizar o botão de concluir tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Item 1',
        completed: false
      };
  
      const {fixture, testHelper} = await setup(fakeTask);
      
      fixture.detectChanges();
  
      const completeBtnDebugEl = testHelper.queryByTestId('list-item-complete-action');
  
      expect(completeBtnDebugEl).toBeTruthy();

      const markAsPendingDebugEl = testHelper.queryByTestId('list-item-mark-as-pending-action');

      expect(markAsPendingDebugEl).toBeNull();
    });

    it('deve emitir um evento ao completar a tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
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

    it('deve emitir um evento ao de remover tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Item 1',
        completed: false
      };
  
      const {fixture, testHelper} = await setup(fakeTask);
  
      const onRemoveTaskSpy = jest.spyOn(fixture.componentInstance, 'onRemove');
      
      fixture.detectChanges();
  
      testHelper.click('list-item-remove-action');

      expect(onRemoveTaskSpy).toHaveBeenCalledWith(fakeTask);
    });
  });  

  describe('quando a tarefa estiver concluída', () => {
    it('deve renderizar o botão de remarcar tarefa como pendente', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Item 1',
        completed: true
      };
  
      const {fixture, testHelper} = await setup(fakeTask);
      
      fixture.detectChanges();
  
      const markAsPendingDebugEl = testHelper.queryByTestId('list-item-mark-as-pending-action');

      expect(markAsPendingDebugEl).toBeTruthy();

      const completeBtnDebugEl = testHelper.queryByTestId('list-item-complete-action');
  
      expect(completeBtnDebugEl).toBeNull();

      
    });

    it('deve emitir um evento que remarque a tarefa como pendente', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Item 1',
        completed: true
      };
  
      const {fixture, testHelper} = await setup(fakeTask);
  
      const onNotCompleteSpy = jest.spyOn(fixture.componentInstance, 'onNotComplete');
      
      fixture.detectChanges();
  
      const markAsPendingDebugEl = testHelper.queryByTestId('list-item-mark-as-pending-action');
      
      markAsPendingDebugEl.triggerEventHandler('click', null);
  
      expect(onNotCompleteSpy).toHaveBeenCalled();
    });

    it('deve emitir um evento ao de remover tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Item 1',
        completed: true
      };
  
      const {fixture, testHelper} = await setup(fakeTask);
  
      const onRemoveTaskSpy = jest.spyOn(fixture.componentInstance, 'onRemove');
      
      fixture.detectChanges();
  
      testHelper.click('list-item-remove-action');

      expect(onRemoveTaskSpy).toHaveBeenCalledWith(fakeTask);
    });
  });  
});
