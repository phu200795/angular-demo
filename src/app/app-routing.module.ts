import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPage1Component } from './pages/demo-page1/demo-page1.component';
import { DemoPage2Component } from './pages/demo-page2/demo-page2.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/pages/demo-page1/demo-page1.module').then(
      m => m.DemoPage1Module
    ),
    // component: DemoPage1Component
  },
  {
    path: "demo-page-2",
    loadChildren: () => import('../app/pages/demo-page2/demo-page2.module').then(
      m => m.DemoPage2Module
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
