import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { motorSpec, vfdSpec, sizeTable } from './interface';
import { Observable } from '../../node_modules/rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  constructor(private db: AngularFireDatabase) { }

  addMotorSpec(data: motorSpec) {
    return this.db.list('/motorSpec').push(data);
  }

  addVfdSpec(data: vfdSpec) {
    return this.db.list('/vfdrSpec').push(data);
  }

  getMotorSpec(): Observable<motorSpec[]> {
    return this.db.list('/motorSpec').snapshotChanges().pipe(
      map(items => {
        return items.map(x => {
          const motorSpec: motorSpec = x.payload.val() as motorSpec;
          return motorSpec;
        });
      }),
    );
  }

  getVfdSpec(): Observable<vfdSpec[]> {
    return this.db.list('/vfdrSpec').snapshotChanges().pipe(
      map(items => {
        return items.map(x => {
          const vfdSpec: vfdSpec = x.payload.val() as vfdSpec;
          return vfdSpec;
        });
      }),
    );
  }

  getsizeTable(): Observable<sizeTable[]> {
    return this.db.list('/sizeTable').snapshotChanges().pipe(
      map(items => {
        return items.map(x => {
          const motorSpec: sizeTable = x.payload.val() as sizeTable;
          return motorSpec;
        });
      }),
    );
  }

}
