import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeComponent } from "../../home/home.component";
import { UniversidadService } from '../../Services/universidad.service';
import {persona  } from "../../Models/Personas.Model";
import { ToastrService } from 'ngx-toastr';


interface Sexo {
  cveSexo: string;
  Sexo: string;
}
interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agregar-persona-modal',
  templateUrl: './agregar-persona-modal.component.html',
  styleUrls: ['./agregar-persona-modal.component.css']
})
export class AgregarPersonaModalComponent implements OnInit {
  PersonaForm:FormGroup;
  Titulo:string;
  selectedSexo: string;
  selecteRol: string;
  PersonaList: any[] = [];
  Personaresult:any;

  sexos: Sexo[] = [
    {cveSexo: 'M', Sexo: 'Masculino'},
    {cveSexo: 'F', Sexo: 'Femenino'}
  ];
  roles: Roles[] = [
    {value: 'A', viewValue: 'Alumno'},
    {value: 'P', viewValue: 'Profesor'}
  ];
  constructor(public dialogRef: MatDialogRef<HomeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {CvePersona},
              private _Service:UniversidadService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    
    
    if (this.data.CvePersona >=1) {
      this.Titulo='Editar Persona'
      this.GetPersona();  
    } else {
      this.Titulo='Agregar Persona'
      
    }
    
    
  }

  createForm(){
    this.PersonaForm = this.fb.group({
      nombre:['', Validators.required],
      apeP:['',Validators.required],
      apeM:['',Validators.required],
      ciudad:['',Validators.required],
      direccion:['',Validators.required],
      sexo:['',Validators.required],
      rol:['',Validators.required],
    })
  }
  GetPersona(){
    this._Service.getPersonas().subscribe(res => {
      this.PersonaList = res;
      const idx = this.PersonaList.findIndex(x => x.cvePersona == this.data.CvePersona);
      this.Personaresult = this.PersonaList[idx];
      
      this.PersonaForm.patchValue({
        nombre:this.Personaresult.nombre,
        apeP:this.Personaresult.apellidoP,
        apeM:this.Personaresult.apellidoM,
        ciudad:this.Personaresult.ciudad,
        direccion:this.Personaresult.direccion,
        sexo:this.Personaresult.sexo,
        rol:this.Personaresult.tipoP,
      });
    }, error => {
      this.toastr.info('Atencion', error)
      
    }
    );
  }

  submit(){
    if (this.data.CvePersona <0) {
      this._Service.guardarUsuario(this.preparePersona()).subscribe(res => {
        this.dialogRef.close(res)
      },error =>this.toastr.info('Atencion', error)
      
      );
      
    } else {
      this._Service.UpdatePersona(this.preparePersona()).subscribe(res => {
        
        
        this.dialogRef.close(res)
      },error =>this.toastr.info('Atencion', error)
      
      );
    }
  }

  preparePersona(){
    const _per = new persona();
    if (this.data.CvePersona <0) {
      
        _per.nombre = this.PersonaForm.get('nombre').value;
        _per.apellidoP = this.PersonaForm.get('apeP').value;
        _per.apellidoM = this.PersonaForm.get('apeM').value;
        _per.apellidoP = this.PersonaForm.get('apeP').value;
        _per.ciudad = this.PersonaForm.get('ciudad').value;
        _per.direccion = this.PersonaForm.get('direccion').value;
        _per.sexo = this.PersonaForm.get('sexo').value;
        _per.tipoP = this.PersonaForm.get('rol').value;

        
        
        return _per
    } else {
      
      _per.CvePersona = this.data.CvePersona;
      _per.nombre = this.PersonaForm.get('nombre').value;
      _per.apellidoP = this.PersonaForm.get('apeP').value;
      _per.apellidoM = this.PersonaForm.get('apeM').value;
      _per.apellidoP = this.PersonaForm.get('apeP').value;
      _per.ciudad = this.PersonaForm.get('ciudad').value;
      _per.direccion = this.PersonaForm.get('direccion').value;
      _per.sexo = this.PersonaForm.get('sexo').value;
      _per.tipoP = this.PersonaForm.get('rol').value;
      
        
        return _per
    }
  }

}
