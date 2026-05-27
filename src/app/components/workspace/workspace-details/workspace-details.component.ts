import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-workspace-details',
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './workspace-details.component.html',
  styleUrl: './workspace-details.component.css'
})
export class WorkspaceDetailsComponent {

  allUsers: any;
  p: any = 1;
  searchText: string = '';
  userId: any;
  filteredData: any[] = [];

  constructor(private service: CommonService, private toastr: NzMessageService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.get(`admin/fetchTeamsByTeamCreaterId?team_creater_id=${this.userId}`).subscribe({
      next: (resp: any) => {
        this.allUsers = resp.data;
        this.filterTable();
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  filterTable() {
    this.p = 1;
    let filtered = this.allUsers;

    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter((item: { team_name: any; email: any; }) =>
        (item.team_name?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }


}
