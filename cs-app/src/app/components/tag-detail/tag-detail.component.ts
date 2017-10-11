import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})

export class TagDetailComponent implements OnInit {
  selectedTag: string;
  private sub: any;
  options: NgDateRangePickerOptions;

  constructor(private route: ActivatedRoute, private dateService: DateService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
       this.selectedTag = params.id;
    });

    this.options = {
      theme: 'gray',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 1
    };
  }

  fetchData(selectedDates) {
    if (selectedDates) {
      let dates = selectedDates.split('-');
      let start = new Date(dates[0]).toJSON();
      let end = new Date(dates[1]).toJSON();
      console.log(start);
      console.log(end);

      this.dateService.getTags(this.selectedTag, start, end).subscribe((tags) => {
        console.log(tags);
      });
    }
  };

}