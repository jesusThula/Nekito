import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Producto } from '../models/producto.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

//VARIABLE QUE VA A CONTENER NUESTRA LISTA DE PRODUCTOS

  productosColeccion: AngularFirestoreCollection<Producto>;
  productos: Observable<Producto[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.productosColeccion = afs.collection<Producto>('inventario');
    this.productos = this.productosColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }

  obtenerInventario() {
    return this.productos;
  }
}
