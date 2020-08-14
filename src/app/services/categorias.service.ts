import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasColeccion: AngularFirestoreCollection<any>;
  categorias: Observable<any[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.categoriasColeccion = afs.collection<any>('categorias');
    this.categorias = this.categoriasColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }
  //FUNCION OBTENER CATEGORIAS
  obtenerCategorias() {
    return this.categorias;
  }
}
