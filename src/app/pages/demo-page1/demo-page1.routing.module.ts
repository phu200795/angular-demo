import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPage1Component } from './demo-page1.component';

const routes: Routes = [
    {
        path: '',
        component: DemoPage1Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoPage1RoutingModule { }
