import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-teams',
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

  allUsers: any;
  p: any = 1;
  searchText: string = '';
  filteredData: any[] = [];

  constructor(private service: CommonService, private toastr: NzMessageService) { }


  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.get(`admin/fetchAllTeams`).subscribe({
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
      filtered = filtered.filter((item: { team_name: any; }) =>
      (item.team_name?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }


}
