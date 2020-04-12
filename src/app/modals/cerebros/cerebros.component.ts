import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CerebrosComponent } from 'src/app/cerebros/cerebros.component';
import { empty } from 'rxjs';

@Component({
  selector: 'modal-cerebros',
  templateUrl: './cerebros.component.html',
  styles: []
})
export class CerebrosModalsComponent implements OnInit {
  @ViewChild('modal') public modal: ElementRef;
  @ViewChild('modalEliminar') public modalEliminar: ElementRef;
  @ViewChild('modalActualizar') public modalActualizar: ElementRef;
  id: string;
  sabor: string;
  descripcion: string;
  precio: number;
  foto: string;
  trigger: boolean;
  username: string;
  constructor(private dataService: DataService, private _renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.trigger = CerebrosComponent.trigger;
    if (this.trigger === true) {
      this.id = CerebrosComponent.id;
      this.sabor = CerebrosComponent.sabor;
      this.descripcion = CerebrosComponent.descripcion;
      this.precio = CerebrosComponent.precio;
      this.foto = CerebrosComponent.imagen;
      CerebrosComponent.trigger = false;
    }
  }
  guardarCerebro() {
    var element = document.getElementById('mensajeAlertaGuardarCerebros');
    element.innerHTML = '';
    this.username = localStorage.getItem('username');
    console.log(this.sabor, this.descripcion, this.precio, this.foto);
    this.dataService.agregarCerebro(this.sabor, this.descripcion, this.precio, this.foto, this.username)
      .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.dataService.obtenerCerebros();
      this.sabor = '';
      this.descripcion = '';
      this.precio = 0;
      this.foto = '';
      localStorage.removeItem('_id');
    }, (error) => {
      console.log( error );
      if (error.error.mensajeError !== 0) {
        (error.error.mensajeError).forEach(function(mensajeError) {
          element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>" +
          "<strong>" + mensajeError.mensaje +"</strong>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          "</button>" +
        "</div>";
        });
      }
    });
  }

  borrarCerebro() {
    var element = document.getElementById("mensajeAlertaBorrarCerebros");
    element.innerHTML = '';
    this.id = CerebrosComponent.id;
    console.log(this.id);
    this.dataService.eliminarCerebro(this.id)
      .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modalEliminar.nativeElement, true).click();
      this.dataService.obtenerCerebros();
    }, (error) => {
      console.log( error );
      if (error.error.mensajeError !== 0) {
        (error.error.mensajeError).forEach(function(mensajeError) {
          element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>" +
          "<strong>" + mensajeError.mensaje + "</strong>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          "</button>" +
        "</div>";
        });
      }
    });
  }

  actualizarCerebro() {
    var element = document.getElementById("mensajeAlertaActualizarCerebros");
    element.innerHTML = "";
    this.dataService.actualizarCerebro(this.id, this.sabor, this.descripcion, this.precio, this.foto)
      .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modalActualizar.nativeElement, true).click();
      this.dataService.obtenerCerebros();
      CerebrosComponent.id = '';
      CerebrosComponent.sabor = '';
      CerebrosComponent.descripcion = '';
      CerebrosComponent.precio = 0;
      CerebrosComponent.imagen = '';
    }, (error) => {
      console.log( error );
      if (error.error.mensajeError != 0) {
        (error.error.mensajeError).forEach(function(mensajeError) {
          element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
          "<strong>" + mensajeError.mensaje +"</strong>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
            "<span aria-hidden='true'>&times;</span>"+
          "</button>"+
        "</div>";
        });
      }
    });
  }

}
