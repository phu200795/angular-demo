import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-common',
  templateUrl: './table-common.component.html',
  styleUrls: ['./table-common.component.scss']
})
export class TableCommonComponent implements OnInit {
  count = 0
  constructor() { }

  ngOnInit() {
  }

  minus(e: any) {
    this.count = e;
  }

  plus(e: any) {
    this.count = e;
  }
}
