import { Component, EventEmitter, Input, OnInit, Output, OnChanges, OnDestroy, AfterViewInit, AfterContentInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
  @Input() count: number = 0;

  // @Output() countChange = new EventEmitter();
  @Output() onMinus = new EventEmitter();
  @Output() onPlus = new EventEmitter();
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
      
  }

  ngAfterViewInit(): void {
      
  }

  ngOnDestroy(): void {
      
  }

  

  minus() {
    this.onMinus.emit(this.count -= 1);
  }

  plus() {
    this.onPlus.emit(this.count += 1);
  }
}
