import { Component, OnInit, ViewChild } from '@angular/core';

//IMPORT DE SERVICIOS, MODELOS Y OTROS
import { Producto } from '../../models/producto.models'
import { InventarioService } from '../../services/inventario.service'
import { NgForm } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { IngresoComponent } from './ingreso/ingreso.component';

//ICONOS FONTAWESOME
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  //ICONOS DE FONTAWESOME
  faPlusCircle = faPlusCircle;
  faSignOutAlt = faSignOutAlt;
  faInfoCircle = faInfoCircle;

  //VARIABLE QUE OBTIENE DATOS DE PRODUCTO (BOTON INFORMACION)
  infoProducto: Producto = {
    id: null,
    nombre: null,
    descripcion: null,
    unidadPrincipal: null,
    unidadSecundaria:null,
    ratioUnidades:null,
    cantidadUnidadPrincipal: null,
    cantidadUnidadSecundaria: null,
    detalles: null,
    categoria:null,
    ubicacion: null,
    serial: null,
    precio: null
}

  //VARIABLE QUE VA A GUARDAR LA LISTA COMPLETA DE DATOS DE SERVICIOS
  listaProductos: Producto[];

  constructor(private servicioInventario: InventarioService) { }

  ngOnInit(): void {
    this.servicioInventario.obtenerInventario().subscribe(productos => {
      this.listaProductos = productos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }

  //FUNCION PARA OBTENER DATOS DE PRODUCTO E IMPRIMIR EN MODAL DE INFO
  recibirInformacion(item: Producto){
      this.infoProducto = item;
  }

}