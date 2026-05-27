import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  allUsers: any;
  p: any = 1;
  searchText: string = '';
  filteredData: any[] = [];

  constructor(private service: CommonService, private toastr: NzMessageService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.get(`admin/users`).subscribe({
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
      filtered = filtered.filter((item: { name: any; email: any; }) =>
      (item.name?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }

  handleCheckboxChange(row: any) {
    if (row.is_block) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to unblock this user!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No"
      }).then((result: any) => {
        if (result.isConfirmed) {
          const formURlData = new URLSearchParams();
          formURlData.set('user_id', row.id);
          formURlData.set('is_block', '0');
          this.service.post(`admin/blockAndUnblockUser`, formURlData.toString()).subscribe({
            next: (resp: any) => {
              this.toastr.success(resp.message);
              this.getAllUsers();
            }
          })
        } else {
          this.getAllUsers();
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to block this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No"
      }).then((result: any) => {
        if (result.isConfirmed) {
          const formURlData = new URLSearchParams();
          formURlData.set('user_id', row.id);
          formURlData.set('is_block', '1');
          this.service.post(`admin/blockAndUnblockUser`, formURlData.toString()).subscribe({
            next: (resp: any) => {
              this.toastr.success(resp.message);
              this.getAllUsers();
            }
          })
        } else {
          this.getAllUsers();
        }
      });
    }
  }


}
