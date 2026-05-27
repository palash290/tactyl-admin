import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  details: any;

  constructor(private service: CommonService) { }
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.get(`admin/adminDashboard`).subscribe({
      next: (resp: any) => {
        this.details = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }


}
