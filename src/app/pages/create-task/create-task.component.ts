import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { TaskWithoutId } from 'src/app/shared/interfaces/tasks.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {

  taskService = inject(TasksService);
  router = inject(Router);
  
  taskForm = new FormGroup({
    title: new FormControl('', {validators: [Validators.required], nonNullable: true}),
  });

  onSubmit():void {
    if (this.taskForm.invalid) {
      return;
    }

    const payload:TaskWithoutId = {
      title: this.taskForm.value.title as string,
      completed: false,
    };
    this.taskService.post(payload).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}

