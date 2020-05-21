import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../airport-description/airport-description.component';

@Component({
  selector: 'app-airport-comments',
  templateUrl: './airport-comments.component.html',
  styleUrls: ['./airport-comments.component.css']
})
export class AirportCommentsComponent implements OnInit {

  @Input() comment: Comment;
  isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
