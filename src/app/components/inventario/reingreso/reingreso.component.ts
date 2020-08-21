import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service'
import { InventarioService } from '../../../services/inventario.service'
import { UnidadesService } from '../../../services/unidades.service'
import { Producto } from 'src/app/models/producto.models';
import { NgForm } from '@angular/forms';
import { IngresoService } from '../../../services/ingresos.service'
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reingreso',
  templateUrl: './reingreso.component.html',
  styleUrls: ['./reingreso.component.css']
})
export class ReingresoComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  //VARIABLES QUE GUARDAN LISTAS DE BASE DE DATOS
  listaCategorias: any[];
  listaUnidades: any[];
  listaProductos: Producto[];
  unidadSeleccionada: string;
  cantidadSeleccionada: number;
  cantidadIngresosLista: number;

  //VARIABLES OPERATIVAS DEL EGRESO
  idProductoElegidoReingreso: string = null;

  constructor(private servicioCategorias: CategoriasService,
              private servicioUnidades: UnidadesService,
              private servicioInventario: InventarioService,
              private servicioIngreso: IngresoService) { }

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
    return this.listaProductos.findIndex(item => item.id == this.idProductoElegidoReingreso);
}

  //FUNCION QUE BUSCA LA UNIDAD PRINCIPAL DEL PRODUCTO SELECCIONADO
  regresarUnidadPrincipal(id: string) {
    return this.listaProductos.find(item => item.id == id).unidadPrincipal;
  }

  //FUNCION QUE BUSCA LA UNIDAD SECUNDARIA DEL PRODUCTO SELECCIONADO
  regresarUnidadSecundaria(id: string) {
    return this.listaProductos.find(item => item.id == id).unidadSecundaria;
  }

  //FUNCION QUE AGREGA LA CANTIDAD SELECCIONADA AL ITEM EN EL INVENTARIO GENERAL
  reingresarProducto() {

      let productoReingresar = this.listaProductos[this.listaProductos.findIndex(itemInv => itemInv.id == this.idProductoElegidoReingreso)];

      //EVALUA CONDICIONES PARA AGREGAR LAS UNIDADES
      if (this.cantidadSeleccionada > 0){
        if(productoReingresar.unidadSecundaria!=null && 
          productoReingresar.cantidadUnidadSecundaria!=null && 
          productoReingresar.ratioUnidades!=null &&
          productoReingresar.ratioUnidades!=0){
            //LUEGO, EVALUA SI EXISTE UNA UNIDAD SECUNDARIA Y UN RATIO
            if(this.unidadSeleccionada == productoReingresar.unidadPrincipal && this.cantidadSeleccionada!=null) {
              productoReingresar.cantidadUnidadPrincipal = productoReingresar.cantidadUnidadPrincipal + this.cantidadSeleccionada;
              productoReingresar.cantidadUnidadSecundaria = productoReingresar.cantidadUnidadPrincipal / productoReingresar.ratioUnidades;
              this.cantidadIngresosLista = this.cantidadSeleccionada;
            }
            else if (this.unidadSeleccionada == productoReingresar.unidadSecundaria && this.cantidadSeleccionada!=null){
              productoReingresar.cantidadUnidadSecundaria = productoReingresar.cantidadUnidadSecundaria + this.cantidadSeleccionada;
              productoReingresar.cantidadUnidadPrincipal = productoReingresar.cantidadUnidadSecundaria * productoReingresar.ratioUnidades;
              this.cantidadIngresosLista = this.cantidadSeleccionada * productoReingresar.ratioUnidades;
            } else {
              return
            }
        } else{
              productoReingresar.cantidadUnidadPrincipal = productoReingresar.cantidadUnidadPrincipal + this.cantidadSeleccionada;
              //VERIFICA LA UNIDAD INGRESADA, Y LA IMPRIME EN LA VARIABLE DE HISTORIAL DE INGRESOS
              this.cantidadIngresosLista = this.cantidadSeleccionada;
        }
        
        this.servicioInventario.editarItem(productoReingresar);

      
    //SE AGREGA EL PRODUCTO NUEVO A LA BASE DE DATOS DE INGRESOS
    this.servicioIngreso.agregarIngreso(
      {
        idItem: this.idProductoElegidoReingreso,
        fecha: new Date().toISOString(),
        cantidad: this.cantidadIngresosLista,
        modalidad: 'Reingreso',
        cantidadInventarioUnidadPrincipal: productoReingresar.cantidadUnidadPrincipal,
      }
    )

    this.form.reset();

  } else { return }

  }

  //FUNCION PARA BORRAR LSO CAMPSO DEL FORMULARIO
  borrarForm() {
    this.form.reset();
  }

}
