import { Component, OnInit } from '@angular/core';
import { EgresoService } from '../../services/egresos.service';
import { Egreso } from '../../models/egreso.models'
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent implements OnInit {

  egresos: Egreso[];
  listaEgresos: Egreso[];
  oculto:boolean = true;

  

  constructor(private servicioEgresos: EgresoService,) { }

  ngOnInit(): void {
    this.servicioEgresos.obtenerEgresos().subscribe(items => {
      this.egresos = items.sort((a, b) => (a.fecha < b.fecha) ? 1 : ((a.fecha > b.fecha) ? -1 : 0));
    })
  }

    //FUNCION PARA DESCARGAR PDF DE EGRESOS
    descargarPDF() {
      this.oculto = false;
      const opciones = {
        margin: 1,
        filename: 'Egresos.pdf',
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
