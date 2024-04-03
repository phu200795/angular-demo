import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class HomeBannerService {
    constructor(private apiService: ApiService) {}

    getSlides() {
      const url = "demo/api";       
      return this.apiService.get(url).pipe(map(res => res.body));
    }

}