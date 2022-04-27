import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  // To use a service, you have to add it as a provider in the constructor
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task?: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task?.id);
    });
  }

  toggleReminder(task?: Task) {
    this.taskService.toggleReminder(task).subscribe(() => {
      this.tasks.forEach((t) => {
        if (t.id === task?.id) {
          t.reminder = !task?.reminder;
        }
      });
    });
  }
}
