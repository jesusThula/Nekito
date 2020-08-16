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
  
  //FUNCION OBTENER INVENTARIO
  obtenerInventario() {
    return this.productos;
  }

  //FUNCION AGREGAR ITEM NUEVO AL INVENTARIO
  agregarItem(nuevoProducto: Producto) {
    this.productosColeccion.doc(nuevoProducto.id).set(nuevoProducto);
  }

  //FUNCION MODIFICAR ITEM EXISTENTE DEL INVENTARIO
  editarItem(productoEditado: Producto) {
    return this.productosColeccion.doc(productoEditado.id).update(productoEditado);
  }
}
