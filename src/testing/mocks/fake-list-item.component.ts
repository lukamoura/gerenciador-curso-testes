import { Component, input, InputSignal, output, OutputEmitterRef } from "@angular/core";
import { ListItemComponent } from "src/app/pages/list/list-item/list-item.component";
import { Task } from "src/app/shared/interfaces/tasks.interface";

@Component({
    selector: 'app-list-item',
    standalone: true,
    template: ''
})
export class FakeListItemComponent implements ListItemComponent {
    task = input.required<Task>();

    notComplete = output<Task>();
    complete = output<Task>();
    remove = output<Task>();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onMarkAsPending(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onComplete(): void {}   

     // eslint-disable-next-line @typescript-eslint/no-empty-function
     onRemove(): void {}   
}