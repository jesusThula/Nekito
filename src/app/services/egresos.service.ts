import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Egreso } from '../models/egreso.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EgresoService {

//VARIABLE QUE VA A CONTENER NUESTRA LISTA DE PRODUCTOS

  egresosColeccion: AngularFirestoreCollection<Egreso>;
  egresos: Observable<Egreso[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.egresosColeccion = afs.collection<Egreso>('egresos');
    this.egresos = this.egresosColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Egreso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }
  
  //FUNCION OBTENER EGRESOS
  obtenerEgresos() {
    return this.egresos;
  }

  //FUNCION AGREGAR ITEM NUEVO A EGRESOS
  agregarEgreso(nuevoEgreso: Egreso) {
    this.egresosColeccion.add(nuevoEgreso);
  }

}