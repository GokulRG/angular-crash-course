import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    // the of method turns regular things to Observables. You can use the below line to get const TASKS as an observable
    // return of(TASKS);
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task?: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task?.id}`;
    return this.http.delete<Task>(url);
  }

  toggleReminder(task?: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task?.id}`;
    const newTask = { ...task, reminder: !task?.reminder };
    return this.http.patch<Task>(url, newTask);
  }
}
