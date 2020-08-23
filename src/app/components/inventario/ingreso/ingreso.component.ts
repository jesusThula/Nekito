import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service'
import { UnidadesService } from '../../../services/unidades.service'
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto.models';
import { InventarioService } from '../../../services/inventario.service'
import { IngresoService } from '../../../services/ingresos.service'

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  //FORMULARIO DE MODAL DE INGRESO
  @ViewChild('f') form: NgForm;

  //VARIABLE QUE VA A GUARDAR LA LISTA COMPLETA DE SERVICIOS
  listaCategorias: any[]; 
  listaUnidades: any[];
  listaProductos: Producto[];

  //VARIABLES DE ALERTAS DE OPERACION
  isAlert: string = null;
  @Output () messageEvent = new EventEmitter<string>();

  
  //VARIABLE QUE VA A ADQUIRIR LOS PARAMETROS DEL FORM, Y SE AGREGARA EN BASE DE DATOS 
  nuevoProducto: Producto = {
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
  };

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

  //FUNCION PARA AGREGAR PRODUCTO AL INVENTARIO, SE BORRAN LOS CAMPOS AL FINAL
  onSubmit(){
  
  //SE COMPRUEBA QUE EL NUMERO A INGRESAR SEA POSITIVO Y MAYOR A 0

    var idAUsar = this.generarId().toString();

    // REVISA SI EL ID ESTA DISPONIBLE Y DE NO ESTARLO LO CAMBIA
    while(!this.revisarDisponibilidad(idAUsar)){
      idAUsar = this.generarId().toString();
    }

    this.nuevoProducto.id = idAUsar;

    if (this.nuevoProducto.cantidadUnidadPrincipal>0){
    //SE IMPRIME LA CANTIDAD DE UNIDAD SECUNDARIA EN BASE AL INPUT DE LA UNIDADES PRINCIPAL. PERO SE VERIFICA LA SELECCION DE UAN UNIDAD SECUNDARIA
    if (this.nuevoProducto.unidadSecundaria!=null && this.nuevoProducto.ratioUnidades!=null && this.nuevoProducto.ratioUnidades > 0){
      this.nuevoProducto.cantidadUnidadSecundaria = (this.nuevoProducto.cantidadUnidadPrincipal / this.nuevoProducto.ratioUnidades);
    } else {
      this.nuevoProducto.cantidadUnidadSecundaria = null;
      this.nuevoProducto.unidadSecundaria = null;
    }


    //SE AGREGA EL PRODUCTO NUEVO A LA BASE DE DATOS DE INVENTARIO
    this.servicioInventario.agregarItem(this.nuevoProducto);

    
    //SE AGREGA EL PRODUCTO NUEVO A LA BASE DE DATOS DE INGRESOS
    this.servicioIngreso.agregarIngreso(
      {
        nombre: this.nuevoProducto.nombre,
        idItem: this.nuevoProducto.id,
        fecha: new Date().toISOString(),
        cantidad: this.nuevoProducto.cantidadUnidadPrincipal,
        modalidad: 'Ingreso',
        cantidadInventarioUnidadPrincipal: this.nuevoProducto.cantidadUnidadPrincipal, 
      }
    )
    //RESET DE FORMULARIO LUEGO DE AGREGAR PRODUCTO
    this.form.reset();
    
    //ALERTA POSITIVA DE INGRESO
    this.isAlert='Positivo';

  } else { return }

  //ALERTA NEGATIVA DE INGRESO
  this.isAlert = 'Negativo';

  }

  //FUNCION QUE ENVIA DATOS DE ALERTAS DE INGRESO 
  sendMessage(){
    this.messageEvent.emit(this.isAlert);
  }

  //FUNCION CERRAR MODAL (REINICIO DE CAMPOS)
  cerrarModal() {
    this.form.reset();
    this.nuevoProducto = {
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
  }

  //GENERADOR DE IDs, REGRESA UN ID A USAR (POSIBLE)
  generarId() {
    return (Math.random() * 1000000000 + 1);
  }

  // RERTORNA TRUE SI EL ID ESTA DISPONIBLE, SI NO RETORNA FALSE
  revisarDisponibilidad(id: string) {
    for(var objeto of this.listaProductos) {
      if(objeto.id == id) {
        return false;
      }
    }
    return true;
  }


}

