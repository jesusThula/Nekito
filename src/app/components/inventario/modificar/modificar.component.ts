import { Component, OnInit, ViewChild } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { UnidadesService } from 'src/app/services/unidades.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Producto } from 'src/app/models/producto.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  listaProductos: Producto[];
  listaUnidades: any[];
  listaCategorias: any[];
  idProductoElegidoModificar: string = null;

  productoElegido: Producto ={
    id: null,
    nombre: null,
    descripcion: null,
    unidadPrincipal:null,
    unidadSecundaria:null,
    ratioUnidades:null,
    cantidadUnidadPrincipal: null,
    cantidadUnidadSecundaria: null,
    categoria:null,
    ubicacion: null,
    serial: null,
    precio: null
}

  constructor(private servicioInventario: InventarioService,
              private servicioUnidades: UnidadesService,
              private servicioCategorias : CategoriasService,) { }

  ngOnInit(): void {
    this.servicioCategorias.obtenerCategorias().subscribe(categorias => {
      this.listaCategorias = categorias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioInventario.obtenerInventario().subscribe(productos => {
      this.listaProductos = productos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioUnidades.obtenerUnidades().subscribe(unidades => {
      this.listaUnidades = unidades.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }

  //FUNCION QUE BUSCA EL ITEM QUE SE VA A MODIFICAR
  alElegirProducto(id: string){
    this.productoElegido = this.listaProductos.find(producto => producto.id == id);
  }

  //FUNCION QUE EJECUTA SERVICIO
  onModificar() {
    this.productoElegido.cantidadUnidadSecundaria = this.productoElegido.cantidadUnidadPrincipal / this.productoElegido.ratioUnidades;
    this.servicioInventario.editarItem(this.productoElegido);
    this.form.reset();
  }

  cerrarModal(){
    this.form.reset();
  }

}
