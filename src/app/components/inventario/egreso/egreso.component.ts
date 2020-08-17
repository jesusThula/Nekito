import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { UnidadesService } from '../../../services/unidades.service';
import { InventarioService } from '../../../services/inventario.service';
import { Producto } from 'src/app/models/producto.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.css']
})

export class EgresoComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  //VARIABLES QUE GUARDAN LISTAS DE BASE DE DATOS
  listaCategorias: any[];
  listaUnidades: any[];
  listaProductos: Producto[];
  unidadSeleccionadaEgreso: string;
  cantidadSeleccionadaEgreso: number;
  idProductoElegidoEgreso: string = null;

  constructor(private servicioCategorias: CategoriasService,
              private servicioUnidades: UnidadesService,
              private servicioInventario: InventarioService) { }

  ngOnInit(): void {
    this.servicioCategorias.obtenerCategorias().subscribe(categorias => {
      this.listaCategorias = categorias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioUnidades.obtenerUnidades().subscribe(unidades => {
      this.listaUnidades = unidades.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioInventario.obtenerInventario().subscribe(inventario => {
      this.listaProductos = inventario.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }

  
  //FUNCION QUE BUSCA PRODUCTO DEL INVENTARIO QUE TIENE EL MISMO ID DEL ITEM ELEGIDO EN EL FORMULARIO
  regresarIndice() {
    return this.listaProductos.findIndex(item => item.id == this.idProductoElegidoEgreso);
}

  //FUNCION QUE BUSCA LA UNIDAD PRINCIPAL DEL PRODUCTO SELECCIONADO
  regresarUnidadPrincipal(id: string) {
    return this.listaProductos.find(item => item.id == id).unidadPrincipal;
  }

  //FUNCION QUE BUSCA LA UNIDAD SECUNDARIA DEL PRODUCTO SELECCIONADO
  regresarUnidadSecundaria(id: string) {
    return this.listaProductos.find(item => item.id == id).unidadSecundaria;
  }

  //FUNCION QUE RESTA LA CANTIDAD SELECCIONADA AL ITEM EN EL INVENTARIO GENERAL
  egresarProducto() {

      let productoEgresar = this.listaProductos[this.listaProductos.findIndex(itemInv => itemInv.id == this.idProductoElegidoEgreso)];

      //EVALUA CONDICIONES PARA RESTAR LAS UNIDADES

      //PRIMERO EVALUA SI EL NUM ES MAYOR A 0, Y SI HAY UNIDADES SUFICIENTES PARA EGRESAR
      if (this.cantidadSeleccionadaEgreso > 0 &&
          productoEgresar.cantidadUnidadPrincipal > 0){

        if(productoEgresar.unidadSecundaria!=null && 
          productoEgresar.cantidadUnidadSecundaria!=null && 
          productoEgresar.ratioUnidades!=null &&
          productoEgresar.ratioUnidades!=0){
            //LUEGO, EVALUA SI EXISTE UNA UNIDAD SECUNDARIA Y UN RATIO
            if(this.unidadSeleccionadaEgreso == productoEgresar.unidadPrincipal && this.unidadSeleccionadaEgreso!=null) {
              //VERIFICA SI LA CANTIDAD SELECCIONADA ES MENOR QUE LA CANTIDAD EXISTENTE
              if (this.cantidadSeleccionadaEgreso <= productoEgresar.cantidadUnidadPrincipal){
                productoEgresar.cantidadUnidadPrincipal = productoEgresar.cantidadUnidadPrincipal - this.cantidadSeleccionadaEgreso;
                productoEgresar.cantidadUnidadSecundaria = productoEgresar.cantidadUnidadPrincipal / productoEgresar.ratioUnidades;
              } else { return }
            }
            else if (this.unidadSeleccionadaEgreso == productoEgresar.unidadSecundaria && this.cantidadSeleccionadaEgreso!=null){
              //VERIFICA SI LA CANTIDAD SELECCIONADA ES MENOR QUE LA CANTIDAD EXISTENTE
              if (this.cantidadSeleccionadaEgreso <= productoEgresar.cantidadUnidadSecundaria){
                productoEgresar.cantidadUnidadSecundaria = productoEgresar.cantidadUnidadSecundaria - this.cantidadSeleccionadaEgreso;
                productoEgresar.cantidadUnidadPrincipal = productoEgresar.cantidadUnidadSecundaria * productoEgresar.ratioUnidades;
              } else { return }

            } else { return }

        } else {
              productoEgresar.cantidadUnidadPrincipal = productoEgresar.cantidadUnidadPrincipal - this.cantidadSeleccionadaEgreso;
        }
        this.servicioInventario.editarItem(productoEgresar);
      } else { return }
      
    this.form.reset();
  }

  //FUNCION PARA BORRAR LOS CAMPSO DEL FORMULARIO
  borrarForm() {
    this.form.reset();
  }

}
