import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCommonComponent } from './table-common.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableCommonComponent, ChildComponent],
  exports: [TableCommonComponent, ChildComponent]
})
export class TableCommonModule { }
