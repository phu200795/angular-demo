import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeListComponent } from './home-list/home-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { HomeEditComponent } from './home-edit/home-edit.component';
import { HomeService } from 'src/app/core/home.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    NgbModule,
  ],
  declarations: [HomeComponent, HomeListComponent, HomeEditComponent],
  providers: [HomeService]
})
export class HomeModule { }
