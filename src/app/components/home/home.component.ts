import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from "@angular/forms";

import { EmpleadosService  } from "src/app/services/empleados.service";

import { ColDef,GridOptions } from "ag-grid-community";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

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
  columnDefs:ColDef[] = [
    {field:'codigo',headerName:'Codigo',sortable:true,filter:false},
    {field:'departmentName',headerName:'Departamento',sortable:true,filter:false},
    {field:'email',headerName:'Email',sortable:true,filter:false},
    {field:'firstName',headerName:'Nombre',sortable:true,filter:false},
    {field:'lastName',headerName:'Apellido',sortable:true,filter:false},
    {field:'phoneNumber',headerName:'Telefono',sortable:true,filter:false}
  ];
  rowData:any[] = [];
  gridOptions:GridOptions = {
    localeText:this.getSpanishTranslation(),
    pagination:true,
    paginationPageSize:5
  }
  constructor(private fb:FormBuilder,private emplService:EmpleadosService,private spinner:NgxSpinnerService){

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
    this.spinner.show()
    this.emplService.getListDepartamento().subscribe(
      (data) => {
        this.departamentos = data.map( (resp:any) => ({id: resp.departamento, name:resp.departamento}));
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
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
    let departamento = this.form_departamento.get('departamento')?.value;
    let body  = {
      departamento
    };
    this.spinner.show();
    this.emplService.getEmpleByDepartamento(body).subscribe(
      (data:any)=>{
        if(data.codIcon === 0){
          this.rowData = data.list;
        }else {
          Swal.fire({
            title:'No hay Resultados',
            text:data.mensaje,
            icon:data.nameIcon
          })
        }
        this.spinner.hide();
      },
      (error)=>{
        Swal.fire({
          title:"Error Server",
          text:`El servidor se encuentra apago o en un actualizacon.`,
          icon:"error"
        });
        console.error(error);
        this.spinner.hide();
      }
    )
  };
  onSubmitEmpleado(){
    console.log('Enviando data => ',this.form_empleado.value);
  }

  //traduccion ag grid
  getSpanishTranslation() {
    return {
      page: 'Página',
      more: 'Más',
      to: 'a',
      of: 'de',
      next: 'Siguiente',
      last: 'Última',
      first: 'Primera',
      previous: 'Anterior',
      loadingOoo: 'Cargando...',
      noRowsToShow: 'No hay datos para mostrar',
      filterOoo: 'Filtrar...',
      equals: 'Igual a',
      notEqual: 'Diferente de',
      lessThan: 'Menor que',
      greaterThan: 'Mayor que',
      contains: 'Contiene',
      notContains: 'No contiene',
      startsWith: 'Empieza con',
      endsWith: 'Termina con',
      // Agrega más traducciones si es necesario
    };
  }

}
