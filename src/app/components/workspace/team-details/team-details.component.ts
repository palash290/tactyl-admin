import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { MembersComponent } from './members/members.component';
import { TasksComponent } from './tasks/tasks.component';
import { BoardsComponent } from './boards/boards.component';

@Component({
  selector: 'app-team-details',
  imports: [CommonModule, MembersComponent, TasksComponent],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsComponent {

  teamId: any;
  teamName: any;
  dashboardData: any;

  constructor(private service: CommonService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.queryParamMap.get('teamId');
    this.teamName = this.route.snapshot.queryParamMap.get('teamName');
    this.getTeamDashboard();
  }

  getTeamDashboard() {
    this.service.get(`admin/teams/${this.teamId}/dashboard`).subscribe({
      next: (resp: any) => {
        this.dashboardData = resp.data;
        // this.team_admin_id = resp.data.team_admin_id;
        // this.getTeamPermissionsForUsers();
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  getTimeAgo(dateString: string): string {
    const createdDate = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - createdDate.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 30) {
      return 'just now';
    }

    if (diffMinutes < 1) {
      return `${diffSeconds}s ago`;
    }

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }

    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  }

  backClicked() {
    this.location.back();
  }


}
