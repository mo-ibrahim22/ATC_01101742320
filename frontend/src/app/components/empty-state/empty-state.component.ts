import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  @Input() title: string = 'No Data';
  @Input() message: string = 'Wait a moment while we fetch the data';
}
