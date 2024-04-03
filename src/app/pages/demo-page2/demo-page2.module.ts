import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPage2Component } from './demo-page2.component';
import { DemoPage2RoutingModule } from './demo-page2.routing.module';

@NgModule({
  imports: [
    CommonModule,
    DemoPage2RoutingModule
  ],
  declarations: [DemoPage2Component]
})
export class DemoPage2Module { }
