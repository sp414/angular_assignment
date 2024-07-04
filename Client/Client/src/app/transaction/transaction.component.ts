import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  data:any;

  constructor(private dataService: DataService, private router:Router, private datePipe:DatePipe) { }

  ngOnInit() {
    this.dataService.getTransactions().subscribe(
      (response) => {
        this.data = response;
        this.data.sort((a:any, b:any) => a.id - b.id);
        this.data.forEach((d:any) => {
              d.date = this.datePipe.transform(d.date, 'dd/MM/yyyy');       
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  navigateToChaild(id:any){

    const queryParam:any = this.data.filter((d:any) =>  d.id == id);

    this.router.navigate(['/details'], { queryParams: { data: JSON.stringify(queryParam) } });
  }
}
 




