import { Component, input, InputSignal } from "@angular/core";
import { ListItemComponent } from "src/app/pages/list/list-item/list-item.component";
import { Task } from "src/app/shared/interfaces/tasks.interface";

@Component({
    selector: 'app-list-item',
    standalone: true,
    template: ''
})
export class FakeListItemComponent implements ListItemComponent {
    task = input.required<Task>();
}