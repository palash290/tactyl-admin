import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-note-details',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {

  noteId: any;
  noteDetails: any;
  loading: boolean = false;
  taskId: any;
  userType: any;

  constructor(private location: Location, private service: CommonService, private route: ActivatedRoute, private toastr: NzMessageService) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.queryParamMap.get('taskId');
    this.noteId = this.route.snapshot.queryParamMap.get('noteId');
    this.userType = localStorage.getItem('userType');
    this.getNotes();
  }

  getNotes() {
    this.service.get(`admin/notes/${this.noteId}`).subscribe({
      next: (resp: any) => {
        this.noteDetails = resp.data;
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
