import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from "@angular/forms";
import { EmpleadosService  } from "src/app/services/empleados.service";

import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  form_departamento!:FormGroup;
  form_empleado!:FormGroup;
  categoria = [
    {id:1,name:'Departamento'},
    {id:2,name:'Empleado'}
  ]
  status = {
    "form_departamento":true,
    "form_empleado":false
  }
  departamentos = [];

  constructor(private fb:FormBuilder,private emplService:EmpleadosService){

  }

  ngOnInit(){
    this.form_departamento = this.fb.group({
      categoria: ['Departamento',Validators.required],
      departamento:[null,Validators.required]
    });
    this.form_empleado = this.fb.group({
      categoria:['Empleado',Validators.required],
      empleado:[null,Validators.required]
    });

    this.emplService.getListDepartamento().subscribe(
      (data) => {
        this.departamentos = data.map( (resp:any) => ({id: resp.departamento, name:resp.departamento}));
      },
      (error) => {
        console.error(error);
      }
    )
  }
  valueFormCategoria(event:any) {
    console.log(event.name);
    if(event.name === 'Empleado'){
      this.status.form_empleado = true;
      this.status.form_departamento = false;
      console.log('form empleado');
      this.form_empleado.patchValue({
        categoria: this.categoria.find(cate => cate.name === 'Empleado') || null,
        departamento:'Accounting'
      })
    }else if(event.name === 'Departamento'){
      this.status.form_departamento = true;
      this.status.form_empleado = false;
      console.log('form departamento');
      this.form_departamento.patchValue({
        categoria:this.categoria.find(cate => cate.name === 'Departamento') || null,
        empleado:''
      })
    }
  }



  onSubmitDepartamento(){
    console.log('Enviando data => ',this.form_departamento.value);
  };
  onSubmitEmpleado(){
    console.log('Enviando data => ',this.form_empleado.value);
  }

}
