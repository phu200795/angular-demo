import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/core/home.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'status', 'user_assigned', 'action'];
  homeData: any[] = [];
  totalRecord: number = 0;
  currentPage: number = 1;
  totalPage: number = 1;
  filterGroup: FormGroup = new FormGroup({});
  pageGroup: FormGroup = new FormGroup({});
  listData: any;
  startRecord: number = 1;
  endRecord: number = 1;
  pages: any;

  @ViewChild('popover', { static: false }) popelement: ElementRef = {} as ElementRef;

  gotoGroup: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HomeService: HomeService,
  ) {
  }

  ngOnInit() {
    this.filterGroup = new FormGroup({
      'filterText': new FormControl('')
    })
    this.pageGroup = new FormGroup({
      'currentPage': new FormControl(this.currentPage + 1),
      'totalRecord': new FormControl(20)
    })
    this.gotoGroup = new FormGroup({
      'gotoPage': new FormControl('')
    })
    this.initLoadPage()
  }

  onNextPage() {
    if (this.currentPage < this.totalPage) {
      this.startRecord = this.endRecord + 1
      if (this.currentPage === this.totalPage - 1) {
        this.endRecord = this.totalRecord
      }
      else {
        this.endRecord += Number(this.pageGroup.value.totalRecord)
      }
      this.currentPage++
      this.getNewDataOnPage(this.currentPage)
      this.pageGroup.controls['currentPage'].setValue(this.currentPage)
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.startRecord -= this.pageGroup.value.totalRecord
      this.endRecord = this.startRecord + (this.pageGroup.value.totalRecord - 1)
      this.currentPage--
      this.getNewDataOnPage(this.currentPage)
      this.pageGroup.controls['currentPage'].setValue(this.currentPage)
    }
  }

  onGotoPage(page: number) {
    let tmppage = page
    if (tmppage > 0 && tmppage <= this.totalPage) {
      this.getNewDataOnPage(tmppage)
      this.currentPage = tmppage
      if (this.currentPage === this.totalPage) {
        this.endRecord = this.totalRecord
        this.startRecord = tmppage * this.pageGroup.value.totalRecord - (this.pageGroup.value.totalRecord - 1)
      }
      else {
        this.endRecord = tmppage * this.pageGroup.value.totalRecord
        this.startRecord = this.endRecord - (this.pageGroup.value.totalRecord - 1)
      }
    }
  }

  getNewDataOnPage(page: number) {
    this.getData(page)
  }

  onFilter() {
    this.pageGroup.controls['totalRecord'].setValue(this.pageGroup.value.totalRecord)
    this.getData(1, this.filterGroup.value.filterText)
  }

  getData(page: number, search: string = '',) {
    this.isLoading = true;
    this.HomeService.getList(search).subscribe(
      (resData: any) => {
        this.hanldeDataAndPagination(true, resData, page);
      },
      (errorMes: any) => {
        switch (errorMes.status) {
          // do
        }
      }
    ).add(() => this.isLoading = false);
  }

  hanldeDataAndPagination(refresh: boolean, resData: any, page: any) {
    this.homeData = resData.items.map((itm: any) => {
      return {
        id: itm.id,
        name: itm.name,
        code: itm.extra_attrs && itm.extra_attrs.code,
        description: itm.extra_attrs && itm.extra_attrs.description,
        status: itm.status,
        user_assigned: itm.extra_attrs && itm.extra_attrs.user_assigned && (itm.extra_attrs.user_assigned === 'true' || itm.extra_attrs.user_assigned === true) ? 'Yes' : 'No',
        editable: itm.editable
      }
    })
    if (refresh) {
      this.totalRecord = resData.total
      this.totalPage = Math.ceil(resData.total / this.pageGroup.value.totalRecord)
      this.endRecord = this.homeData.length
      this.currentPage = 1
      this.startRecord = 1
      this.pages = []
      if (this.totalPage <= 8) {
        this.pages = Array.from({ length: this.totalPage }, (_, i) => i + 1)
      }
      else {
        this.createNewPageNumber(this.currentPage)
      }
    }
    else {
      this.createNewPageNumber(page)
    }
  }

  initLoadPage() {
    this.getData(1)
  }

  createNewPageNumber(currentPage: number) {
    let tmppage = [...this.pages]
    let tmpstart = currentPage
    let tmpend = currentPage + 4
    if (this.totalPage <= 8) {
      tmppage = Array.from({ length: this.totalPage }, (_, i) => i + 1)
    }
    else {
      if (currentPage < this.totalPage) {
        if (currentPage <= 5) {
          tmpstart = 2
          tmpend = 6
        }

        if (currentPage === this.totalPage - 1) {
          tmpstart = this.totalPage - 4
          tmpend = this.totalPage
        }

        if (!tmppage.includes(currentPage)) {
          tmppage = []
          if (tmpend > this.totalPage) {
            tmpstart = tmpstart - 1
            tmpend = this.totalPage
          }
          for (let i = tmpstart; i < tmpend; i++) {
            tmppage.push(i)
          }
        }
        // this.pages = tmppage
      }

      if (currentPage === this.totalPage) {
        tmpstart = this.totalPage - 4
        tmpend = this.totalPage
        tmppage = []
        for (let i = tmpstart; i < tmpend; i++) {
          tmppage.push(i)
        }
        // this.pages = tmppage
      }
    }
    this.pages = tmppage
    this.gotoGroup.controls['gotoPage'].setValue('')
    this.closePopover(this.popelement)
  }

  togglePopover(popover: any) {
    popover && popover.toggle();
  }

  closePopover(popover: any) {
    popover && popover.close()
  }

  onGotoPageSubmit() {
    this.onGotoPage(this.gotoGroup.value.gotoPage)
  }

  onKeyDownNumber(e: any) {
    let invalidChars = [
      "-",
      "+",
      "e",
      "."
    ];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  }
}
