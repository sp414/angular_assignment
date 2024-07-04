import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details:any;
  data:any;
  detailsForm:FormGroup;

  constructor(private route: ActivatedRoute, private dataService:DataService) {
    this.detailsForm = new FormGroup({
      id: new FormControl(''),
      date: new FormControl(''),
      Comments: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.details = JSON.parse(params['data']);
    });

    if(this.details != null) {
      this.detailsForm.setValue({
        id:this.details[0].id,
        date:this.details[0].date,
        Comments:this.details[0].Comments
      });
    }
  }

  submitComment() {
    this.data = {
      id:this.details[0].id,
      comments: this.details[0].Comments
    };
    
    this.dataService.updateComments(this.data).subscribe(
      Response => {
        console.log("Updated: "+this.details);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  

}
