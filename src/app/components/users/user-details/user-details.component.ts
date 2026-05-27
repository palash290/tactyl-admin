import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  userId: any;
  memberDetails: any;
  allTeams: any;
  role: any;
  allTasks: any;

  constructor(private location: Location, private service: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.queryParamMap.get('role');
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.getUsers();
  }

  getUsers() {
    this.service.get(`admin/fetchSingleUserDetails?user_id=${this.userId}`).subscribe({
      next: (resp: any) => {
        this.memberDetails = resp.data;
        if (this.role == 'Workspace Member') {
          this.allTeams = resp.data.teamsDetails;
        } else {
          this.allTeams = [];
        }

        if (this.role == 'Workspace Member') {
          this.allTasks = resp.data.taskDetails || [];
        } else {
          this.allTasks = resp.data.individualTaskDetails || [];
        }
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
