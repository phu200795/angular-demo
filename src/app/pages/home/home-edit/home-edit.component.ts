import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/core/home.service';

@Component({
  selector: 'app-home-edit',
  templateUrl: './home-edit.component.html',
  styleUrls: ['./home-edit.component.scss']
})
export class HomeEditComponent implements OnInit {
  homeForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  isSuccess: boolean = true;
  errorMessage: string = '';
  isEditMode: boolean = false;
  isCancel: boolean = false;
  newRoute: string = '';

  userToken: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {

  }

  ngOnInit(): void {
    this.initHomeForm();
  }


  onSubmit() {
    this.isSubmitted = true
    if (this.homeForm.valid) {
      if (!this.isEditMode) {
        const dataSend: any = {
          name: this.homeForm.value.homename,
          status: 'Active',
          extra_attrs: {
            code: this.homeForm.value.homecode,
            description: this.homeForm.value.description,
            user_assigned: 'false'
          }
        }
        this.homeService.postList(dataSend).subscribe(
          (resData: any) => {
            this.router.navigate([''])
          },
          (errorMes: any) => {
            switch (errorMes.status) {
              // do
            }
          }
        )
      }
    }
  }

  initHomeForm() {
    this.homeForm = new FormGroup({
      'homename': new FormControl('', [Validators.required, Validators.maxLength(64)]),
      'homecode': new FormControl('', [Validators.required, Validators.maxLength(64)]),
      'description': new FormControl('', [Validators.maxLength(255)]),
      'status': new FormControl('Active')
    });
  }

  onStrimText(field: any) {
    let tmptext = this.homeForm.controls[field]?.value
    tmptext = tmptext && tmptext.trim() || '';
    if (tmptext.length === 0) {
      this.homeForm.controls[field].setValue(null)
    }
    else {
      this.homeForm.controls[field].setValue(tmptext)
    }
  }
}
