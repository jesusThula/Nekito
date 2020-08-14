import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  unidadesColeccion: AngularFirestoreCollection<any>
  unidades: Observable<any[]>

  constructor(private readonly afs: AngularFirestore) { 
    
    this.unidadesColeccion = afs.collection<any>('unidades');
    this.unidades = this.unidadesColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

    //FUNCION OBTENER UNIDADES
    obtenerUnidades() {
      return this.unidades;
    }
}
