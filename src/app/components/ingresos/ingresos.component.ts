import { Component, OnInit } from '@angular/core';
import { IngresoService } from '../../services/ingresos.service';
import { Ingreso } from 'src/app/models/ingreso.models';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  //VARIABLE QUE VA A ALMACENAR EL ARRAY DE INGRESOS
  ingresos: Ingreso[];
  
  constructor(private servicioIngresos: IngresoService) { }

  ngOnInit(): void {this.servicioIngresos.obtenerIngresos().subscribe(items => {
    this.ingresos = items.sort((a, b) => (a.fecha < b.fecha) ? 1 : ((a.fecha > b.fecha) ? -1 : 0));
  })
  }

}
