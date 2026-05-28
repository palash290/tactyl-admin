import { Component } from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-members',
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {

  teamMembers: any;
  teamId: any;
   searchText: string = '';
  filteredData: any[] = [];
  p: any = 1;
  team_creator_name: any

  constructor(private service: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.queryParamMap.get('teamId');
    this.getTeamMembers();
  }

  getTeamMembers() {
    this.service.get(`admin/teams/${this.teamId}`).subscribe({
      next: (resp: any) => {
        this.team_creator_name = resp.data.team_creator_name;
        this.teamMembers = resp.data.team_users;
        // this.userId = resp.data.user_id;
        this.filterTable();
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

    filterTable() {
    this.p = 1;
    let filtered = this.teamMembers;

    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter((item: { name: any; email: any; }) =>
      (item.name?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }


}
