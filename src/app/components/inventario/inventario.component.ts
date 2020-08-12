import { Component, OnInit, ViewChild } from '@angular/core';

//IMPORT DE SERVICIOS, MODELOS Y OTROS
import { Producto } from '../../models/producto.models'
import { NgForm } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { IngresoComponent } from './ingreso/ingreso.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  listaProductos: Producto[];

  constructor() { 

    this.listaProductos=[{
      id: "nekito-s",
      nombre: "Nekito Talla-S",
      descripcion: "Pañal Nekito Talla-S",
      cantidadBulto: 10,
      cantidadUnidad: 10,
    },
    {
      id: "nekito-m",
      nombre: "Nekito Talla-M",
      descripcion: "Pañal Nekito Talla-M",
      cantidadBulto: 15,
      cantidadUnidad: 15,
    },
    {
      id: "nekito-l",
      nombre: "Nekito Talla-L",
      descripcion: "Pañal Nekito Talla-L",
      cantidadBulto: 20,
      cantidadUnidad: 20, 
    }
    ]

  }

  ngOnInit(): void {
  }
  
}

