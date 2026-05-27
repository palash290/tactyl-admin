import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-team-details',
  imports: [CommonModule],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsComponent {

  constructor(private location: Location) { }

  backClicked() {
    this.location.back();
  }
}
