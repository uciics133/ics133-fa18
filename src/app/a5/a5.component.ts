import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-a5',
  templateUrl: './a5.component.html',
  styleUrls: ['./a5.component.css']
})
export class A5Component implements OnInit {
  assignment:{};

  constructor(private http:HttpClient) {
  	this.http.get('./assets/calendar.json').subscribe(calendar => {
  		this.parseAssignment(calendar as {}, 'A5');
  	});
  }

  ngOnInit() {
  }

  parseAssignment(calendar:{}, assignment:string) {
    let events:any[] = calendar['events'];

    //Filter to this assignment
    this.assignment = events.filter(e => e['type'] == 'assignment' && e['title'] == assignment)[0];
    
    //Set due date
	let due = moment(this.assignment['date'] + " " + calendar['defaults'].assignment.due).add(1, 'day');
    this.assignment['due'] = due.format('dddd, MMMM Do, h:mma');
  }
}
