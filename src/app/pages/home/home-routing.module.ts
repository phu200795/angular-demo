import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';import { HomeListComponent } from './home-list/home-list.component';
import { HomeEditComponent } from './home-edit/home-edit.component';
import { HomeComponent } from './home.component';
;


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        {path: '', component: HomeListComponent},
        {path: 'new', component: HomeEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
