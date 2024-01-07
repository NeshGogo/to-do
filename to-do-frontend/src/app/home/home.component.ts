import { Component, OnInit, signal } from '@angular/core';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { TaskService } from '../services/task.service';
import { Task, TaskCreate } from '../Models/Task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ThemeToggleComponent,
    TaskListComponent,
    TaskFormComponent,
    MatDividerModule,
  ],
  template: `
    <app-theme-toggle></app-theme-toggle>
    <section class="container">
      <h1 class="primary-title text-center">My Tasks</h1>
      <div class="my-2">
        <app-task-form (newAdded)="this.newAdded($event)"></app-task-form>
      </div>
      <mat-divider></mat-divider>
      <div class="content">
        <app-task-list
          [todo]="this.taskToDo()"
          [done]="this.taskDone()"
          (taskUpdated)="this.updateTask($event)"
        ></app-task-list>
      </div>
    </section>
  `,
  styles: `
    .content {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    .main{
      margin: 0 auto;
    }
    .container{
      padding: 2rem;
    }
  `,
})
export class HomeComponent implements OnInit {
  taskToDo = signal<Task[]>([]);
  taskDone = signal<Task[]>([]);
  constructor(private service: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.service.getAll().subscribe((tasks) => {
      this.taskToDo.set(tasks.filter((p) => p.done === false));
      this.taskDone.set(tasks.filter((p) => p.done === true));
    });
  }

  newAdded(task: Task) {
    this.taskToDo.set([...this.taskToDo(), task]);
  }

  updateTask(task: Task) {
    const body: TaskCreate = {
      title: task.title,
      done: task.done,
    };
    this.service.update(task.id, body).subscribe(p => {
      console.log(p);
    });
  }
}
