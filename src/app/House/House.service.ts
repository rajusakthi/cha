import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { House } from '../org.groci.house';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class HouseService {

	
		private NAMESPACE: string = 'org.groci.house.House';
	



    constructor(private dataService: DataService<House>) {
    };

    public getAll(): Observable<House[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<House> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<House> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<House> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<House> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
