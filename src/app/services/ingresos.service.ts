import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ingreso } from '../models/ingreso.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IngresoService {

//VARIABLE QUE VA A CONTENER NUESTRA LISTA DE PRODUCTOS

  ingresosColeccion: AngularFirestoreCollection<Ingreso>;
  ingresos: Observable<Ingreso[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.ingresosColeccion = afs.collection<Ingreso>('ingresos');
    this.ingresos = this.ingresosColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Ingreso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }
  
  //FUNCION OBTENER INVENTARIO
  obtenerIngresos() {
    return this.ingresos;
  }

  //FUNCION AGREGAR ITEM NUEVO A INGRESOS
  agregarIngreso(nuevoIngreso: Ingreso) {
    this.ingresosColeccion.add(nuevoIngreso);
  }

}