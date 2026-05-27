import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-discount-management',
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './discount-management.component.html',
  styleUrl: './discount-management.component.css'
})
export class DiscountManagementComponent {

  allUsers: any;
  p: any = 1;
  searchText: string = '';
  filteredData: any[] = [];

  constructor(private service: CommonService, private toastr: NzMessageService) { }

  ngOnInit() {
    this.getDiscounts();
  }

  getDiscounts() {
    this.service.get(`admin/discounts`).subscribe({
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
      filtered = filtered.filter((item: { code: any; discount_value: any; }) =>
      (item.code?.toLowerCase().includes(keyword) ||
        item.discount_value?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }


}
