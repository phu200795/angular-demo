import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPage1Component } from './demo-page1.component';
import { DemoPage1RoutingModule } from './demo-page1.routing.module';
import { TableCommonModule } from 'src/app/features/table-common/table-common.module';

@NgModule({
  imports: [
    CommonModule,
    DemoPage1RoutingModule,
    TableCommonModule
  ],
  declarations: [DemoPage1Component],
})
export class DemoPage1Module { }
