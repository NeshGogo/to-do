import { Injectable } from '@angular/core';
import { Task, TaskCreate } from '../Models/Task';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly api = `${environment.api}/api/taskstodo`;
  constructor(private http: HttpClient) {}

  add(taskCreate: TaskCreate) {
    return this.http.post<Task>(this.api, taskCreate);
  }

  update(id: string, taskCreate: TaskCreate) {
    return this.http.put<Task>(`${this.api}/${id}`, taskCreate);
  }

  getAll() {
    return this.http.get<Task[]>(this.api);
  }

  delete(id: string){
    return this.http.delete<null>(`${this.api}/${id}`);
  }
}
