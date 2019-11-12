import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor() { }

  private prodCount = 0;
  prodCountCountChange: Subject<number> = new Subject<number>();
  UpdateCount(count: number) {
      this.prodCount = count;
      this.prodCountCountChange.next(this.prodCount);
  }
}
