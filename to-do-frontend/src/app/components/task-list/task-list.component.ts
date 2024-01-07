import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DragDropModule, CdkDropListGroup, CdkDropList, CdkDrag],
  template: `
    <div class="container">
      <h2>To do</h2>

      <div
        cdkDropList
        #todoList="cdkDropList"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doneList]"
        class="list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of todo; track item) {
        <div class="box" cdkDrag>{{ item.title }}</div>
        }
      </div>
    </div>

    <div class="container">
      <h2>Done</h2>

      <div
        cdkDropList
        #doneList="cdkDropList"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="[todoList]"
        class="list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of done; track item) {
        <div class="box" cdkDrag>{{ item.title }}</div>
        }
      </div>
    </div>
  `,
  styles: `
    .container {
  width: 400px;
  max-width: 100%;
  margin: 0 25px 25px 0;
  display: inline-block;
  vertical-align: top;
}

.list {
  border: solid 1px #ccc;
  min-height: 60px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  display: block;
}

.box {
  padding: 20px 10px;
  border-bottom: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: move;
  background: white;
  font-size: 14px;
}

.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
              0 8px 10px 1px rgba(0, 0, 0, 0.14),
              0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.cdk-drag-placeholder {
  opacity: 0;
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.box:last-child {
  border: none;
}

.list.cdk-drop-list-dragging .box:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
  `,
})
export class TaskListComponent {
  @Output() taskUpdated: EventEmitter<Task> = new EventEmitter()
  @Input() todo: Task[] = [];
  @Input() done: Task[] = [];
  // todo: Task[] = [
  //   {
  //     id: '2131',
  //     title: 'Get to work',
  //     done: false,
  //   },
  //   {
  //     id: '2132',
  //     title: 'Pick up groceries',
  //     done: false,
  //   },
  //   {
  //     id: '2133',
  //     title: 'Go home',
  //     done: false,
  //   },
  //   {
  //     id: '2134',
  //     title: 'Fall asleep',
  //     done: false,
  //   },
  // ];

  // done: Task[] = [
  //   {
  //     id: '2131',
  //     title: 'Get up',
  //     done: true,
  //   },
  //   {
  //     id: '2131',
  //     title: 'Brush teeth',
  //     done: true,
  //   },
  //   {
  //     id: '2131',
  //     title: 'Take a shower',
  //     done: true,
  //   },
  //   {
  //     id: '2131',
  //     title: 'Check e-mail',
  //     done: true,
  //   },
  //   {
  //     id: '2131',
  //     title: 'Walk dog',
  //     done: true,
  //   },
  // ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const element =  event.previousContainer.data[event.previousIndex];
      element.done = !element.done;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.taskUpdated.emit(element);
    }
  }
}
