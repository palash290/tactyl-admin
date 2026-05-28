import { Component } from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, RouterLink, FormsModule, NgxPaginationModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  teamId: any;
  searchText: string = '';
  taskList: any;
  p: any = 1;

  constructor(private service: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.queryParamMap.get('teamId');
    this.getAllTasks();
  }

  getAllTasks() {
    let params = new URLSearchParams();

    // if (this.teamOnly) {
    //   const effectiveTeamId = this.teamId || this.selectedTeamId;
    //   if (effectiveTeamId) {
    //     params.append('team_id', effectiveTeamId);
    //   }
    //   if (this.selectedPriority) {
    //     params.append('priority', this.selectedPriority);
    //   }
    //   if (this.selectedRecent) {
    //     params.append('order', this.selectedRecent);
    //   }
    //   if (this.selectedAssignById) {
    //     params.append('assignee_id', this.selectedAssignById);
    //   }
    //   if (this.selectedBoardId) {
    //     params.append('board_id', this.selectedBoardId);
    //   }
    //   if (this.selectedPhaseId) {
    //     params.append('phase_id', this.selectedPhaseId);
    //   }
    //   if (this.isRevelent) {
    //     params.append('goal_relevant', this.isRevelent);
    //   }

    //   if (this.searchText?.trim()) {
    //     params.append('search', this.searchText.trim());
    //   }
    //   if (this.taskVisibility == 'private') {
    //     params.append('is_private', '1');
    //   } else {
    //     params.append('is_private', '0');
    //   }
    //   if (this.isTaskCompleted === 'show') {
    //     params.append('status', 'Completed');
    //   } else if (this.isTaskCompleted === 'hide') {
    //     params.append('status', 'Pending');
    //   }
    //   this.service.get(`user/tasks?${params.toString()}`).subscribe({
    //     next: (resp: any) => {
    //       let list = resp.data;
    //       if (this.selectedTaskScope === 'team') {
    //         list = list.filter((task: any) => task.team_id != null);
    //       } else if (this.selectedTaskScope === 'my') {
    //         list = list.filter((task: any) => task.team_id == null);
    //       }
    //       this.taskList = list;
    //     },
    //     error: (error) => {
    //       console.log(error.message);
    //       this.taskList = [];
    //     }
    //   });
    //   return;
    // }

    // if (this.selectedPriority) {
    //   params.append('priority', this.selectedPriority);
    // }

    // if (this.selectedRecent) {
    //   params.append('order', this.selectedRecent);
    // }

    // if (this.selectedAssignById) {
    //   params.append('assign_by', this.selectedAssignById);
    // }

    // if (this.selectedBoardId) {
    //   params.append('board_id', this.selectedBoardId);
    // }

    // if (this.selectedPhaseId) {
    //   params.append('phase_id', this.selectedPhaseId);
    // }

    // if (this.searchText?.trim()) {
    //   params.append('search', this.searchText.trim());
    // }

    params.append('team_id', this.teamId);

    // if (this.isRevelent) {
    //   params.append('goal_relevant', this.isRevelent);
    // }

    // // params.append('is_private', this.showPrivateTask ? '1' : '0');
    // if (this.taskVisibility == 'private') {
    //   params.append('is_private', '1');
    // } else {
    //   params.append('is_private', '0');
    // }

    // if (this.isTaskCompleted === 'show') {
    //   params.append('status', 'Completed');
    // } else if (this.isTaskCompleted === 'hide') {
    //   params.append('status', 'Pending');
    // }

    this.service.get(`admin/tasks?${params.toString()}`).subscribe({
      next: (resp: any) => {
        let list = resp.data;
        // if (this.selectedTaskScope === 'team') {
        //   list = list.filter((task: any) => task.team_id != null);
        // } else if (this.selectedTaskScope === 'my') {
        //   list = list.filter((task: any) => task.team_id == null);
        // }
        this.taskList = list;
      },
      error: (error) => {
        console.log(error.message);
        // this.taskList = [];
      }
    });
  }


}
