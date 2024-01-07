import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { Task, TaskCreate } from '../../Models/Task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  template: `
    <form class="form" (ngSubmit)="submit()">
      <mat-form-field class="full-width">
        <mat-label>Title</mat-label>
        <input
          type="email"
          matInput
          [formControl]="title"
          placeholder="Get to work"
        />

        @if (title.hasError('required')) {
        <mat-error>Title is <strong>required</strong></mat-error>
        }
      </mat-form-field>
      <button mat-fab extended color="primary btn" type="submit">
        <mat-icon>send</mat-icon>
        Add
      </button>
    </form>
  `,
  styles: `
    .form {
      display: flex;
      align-items: center;
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }

    .btn {
      margin-left: 0.5rem;
      margin-bottom: 1rem;
    }
  `,
})
export class TaskFormComponent {
  @Output() newAdded: EventEmitter<Task> = new EventEmitter();

  constructor(private service: TaskService) {}

  title = new FormControl('', [Validators.required]);

  submit() {
    if (this.title.invalid) {
      return;
    }

    const body: TaskCreate = {
      title: this.title.value as string,
      done: false,
    };
    this.service.add(body).subscribe((task) => {
      this.newAdded.emit(task);
    });
    this.title.reset();
  }
}
