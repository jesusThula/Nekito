import { Component, OnInit } from '@angular/core';
import { IngresoService } from '../../services/ingresos.service';
import { Ingreso } from 'src/app/models/ingreso.models';
import { InventarioService } from '../../services/inventario.service'
import { CategoriasService } from '../../services/categorias.service'
import { Producto } from 'src/app/models/producto.models';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  //VARIABLE QUE VA A ALMACENAR EL ARRAY 
  ingresos: Ingreso[];
  listaProductos: Producto[];
  oculto:boolean = true;
  
  constructor(private servicioIngresos: IngresoService,
              private servicioInventario: InventarioService,
              private servicioCategoria:CategoriasService) { }

  ngOnInit(): void {
    this.servicioIngresos.obtenerIngresos().subscribe(items => {
    this.ingresos = items.sort((a, b) => (a.fecha < b.fecha) ? 1 : ((a.fecha > b.fecha) ? -1 : 0));
  })
  this.servicioInventario.obtenerInventario().subscribe(inventario => {
    this.listaProductos = inventario.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
  })
  }

  //BUSCA EL ID DEL ITEM QUE CONCUERDA ENTRE INVENTARIO E INGRESO
  regresarIndice(idItem) {
    return this.listaProductos.findIndex(item => item.id == idItem);
  }

  //FUNCION PARA DESCARGAR PDF DE INGRESOS
  descargarPDF() {
    this.oculto = false;
    const opciones = {
      margin: 1,
      filename: 'Ingresos.pdf',
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
