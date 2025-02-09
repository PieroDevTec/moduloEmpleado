import { Component } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(){

  }
  alert(){
    Swal.fire({
      imageUrl:"https://media.istockphoto.com/id/1149317024/es/vector/emoticono-con-signo-de-l%C3%A1stima.jpg?s=612x612&w=0&k=20&c=qxEzUbM2dtBeO9oAp1oY14a6-QraTuHR8tSqQOe_rg4=",
      imageWidth:150,
      imageHeight:150,
      imageAlt:"question",
      text: "La seccion de reporte de empleados, se encuentra en desarrollo",
      footer: '<p><strong>MODULO DE EMPLEADOS</strong></p>',
      confirmButtonColor: "#3085d6",
      confirmButtonText: "DE ACUERDO"
    });
  }
}
