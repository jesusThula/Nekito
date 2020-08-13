import { Component, OnInit, ViewChild } from '@angular/core';

//IMPORT DE SERVICIOS, MODELOS Y OTROS
import { Producto } from '../../models/producto.models'
import { InventarioService } from '../../services/inventario.service'
import { NgForm } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { IngresoComponent } from './ingreso/ingreso.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  //VARIABLE QUE VA A GUARDAR LA LISTA COMPLETA DEL INVENTARIO EXISTENTE
  listaProductos: Producto[];

  constructor(private servicioInventario: InventarioService) { }

  ngOnInit(): void {
    this.servicioInventario.obtenerInventario().subscribe(productos => {
      this.listaProductos = productos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }
  
}

