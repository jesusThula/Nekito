import { Component, OnInit, ViewChild } from '@angular/core';

//IMPORT DE SERVICIOS, MODELOS Y OTROS
import { Producto } from '../../models/producto.models'
import { InventarioService } from '../../services/inventario.service'
import { CategoriasService } from '../../services/categorias.service';
import { NgForm } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { IngresoComponent } from './ingreso/ingreso.component';
import * as html2pdf from 'html2pdf.js';

//ICONOS FONTAWESOME
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

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
  faEraser = faEraser;

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
    categoria:null,
    ubicacion: null,
    serial: null,
    precio: null
}

 //VARIABLE QUE OBTIENE DATOS DE PRODUCTO A ELIMINAR (BOTON ELIMINAR)
  infoProductoEliminar = {
    id: null,
    nombre: null,
  }


  isAlert:string = null;


  //VARIABLE QUE VA A GUARDAR LA LISTA COMPLETA DE DATOS DE SERVICIOS
  listaProductos: Producto[];
  listaCategorias: any[];  
  oculto: boolean = true;
  constructor(private servicioInventario: InventarioService,
              private servicioCategoria: CategoriasService) { }

  ngOnInit(): void {
    this.servicioInventario.obtenerInventario().subscribe(productos => {
      this.listaProductos = productos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioCategoria.obtenerCategorias().subscribe(categorias => {
      this.listaCategorias = categorias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }

  //FUNCION PARA OBTENER DATOS DE PRODUCTO E IMPRIMIR EN MODAL DE INFO
  recibirInformacion(item: Producto){
    this.infoProducto = item;
  }

  //FUNCION PARA OBTENER DATOS DE PRODUCTO PARA ELIMINARLO
  recibirInformacionEliminar(idEliminar, nombreEliminar){
      this.infoProductoEliminar.id = idEliminar;
      this.infoProductoEliminar.nombre= nombreEliminar;
  }

  //FUNCION PARA ELIMINAR PRODUCTO DE BASE DE DATOS 
  eliminarItem(){
    this.servicioInventario.eliminarItem(this.infoProductoEliminar.id);
  }


  statusOperacion($event){
    this.isAlert=$event;
  }

  volverEstadoAlerta(){
    this.isAlert = null;
  }

  //FUNCION PARA DESCARGAR PDF DE INVENTARIO
  descargarPDF() {
    this.oculto = false;
    const opciones = {
      margin: 1,
      filename: 'Inventario.pdf',
      image: {type: 'jpeg', quality: 1},
      html2canvas: {},
      jsPDF: {unit: 'cm', format: 'letter', orientation: 'portrait'}
    };

    const contenido: Element = document.getElementById('elemento-a-exportar');

    html2pdf()
      .from(contenido)
      .set(opciones)
      .save();

      this.oculto = true;
  }


}