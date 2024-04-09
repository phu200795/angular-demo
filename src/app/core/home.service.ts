import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class HomeService {
  list: any = {
    "total": 2,
    "items": [
      {
        "id": "6bbffc00-cd37-4856-8eed-6158f873ba74",
        "name": "QCtesting",
        "status": "Active",
        "editable": true,
        "permissions": null,
        "extra_attrs": {
          "code": "QCtesting",
          "user_assigned": true,
          "description": "QCtesting"
        }
      },
      {
        "id": "248cb419-1cb0-4e87-ba5a-59c91306296b",
        "name": "ADMIN",
        "status": "Active",
        "editable": true,
        "permissions": null,
        "extra_attrs": {
          "code": "ADMIN",
          "user_assigned": true,
          "description": "test"
        }
      }
    ]
  }
  constructor(private apiService: ApiService) { }

  getList(txtSearch: string = '') {
    // const url = "demo/api";       
    // return this.apiService.get(url).pipe(map(res => res.body));
    const temp = this.list.items.filter((item: any) => item.name.includes(txtSearch));
    return of({
      total: this.list.total,
      items: temp
    })
  }

  postList(object: any) {
    return of({object});
  }
}