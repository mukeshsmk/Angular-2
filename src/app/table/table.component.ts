import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  details: any;
  detailsarray: any;
  items : any;
  private BASE_URL: string = "http://localhost:3000/posts";
  constructor(private httpService: HttpClient) {  
}
  ngOnInit() {
    this.httpService.get(this.BASE_URL).subscribe(data => {
      this.details = data;
      this.detailsarray = this.details[0];
      console.log("detailsarray", this.detailsarray)
  })

}

pageCount(event:any)
{
this.items=event.target.value;
console.log("if change in method "+this.items)
}

}
