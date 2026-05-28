import { Component } from '@angular/core';
import { CommonService } from '../../../../../services/common.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tasks-details',
  imports: [CommonModule, RouterLink, FormsModule, NgxPaginationModule],
  templateUrl: './tasks-details.component.html',
  styleUrl: './tasks-details.component.css'
})
export class TasksDetailsComponent {

  taskId: any;
  searchText: string = '';
  taskList: any;
  p: any = 1;
  loading: boolean = false;
  taskDetails: any;
  taskName: any;
  actualTime: any;
  noteList: any;

  constructor(private service: CommonService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.queryParamMap.get('taskId');
    this.getTaskDetails(this.taskId);
    this.getNotes();
  }

  getTaskDetails(taskId: any) {
    this.loading = true;
    this.service.get(`admin/tasks/${taskId}`).subscribe({
      next: (resp: any) => {
        this.taskDetails = resp.data;
        this.taskName = resp.data.title;
        this.actualTime = `${resp.data.estimated_hours} hr ${resp.data.estimated_minutes} min`;
        const taskType = resp.data.team_id ? 'Team' : 'Personal';
        this.loading = false;
      },
      error: (error) => {
        console.log(error.message);
        this.loading = false;
      }
    });
  }

  getNotes() {
    this.service.get(`admin/notes?task_id=${this.taskId}`).subscribe({
      next: (resp: any) => {
        this.noteList = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  backClicked() {
    this.location.back();
  }

}
