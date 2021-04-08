import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { UniversidadService } from '../Services/universidad.service';
import { ToastrService } from 'ngx-toastr';

//Componentes
import {AgregarPersonaModalComponent  } from "../Modal/agregar-persona-modal/agregar-persona-modal.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellidos', 'direccion', 'fecha','sexo','Estatus','acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _Service:UniversidadService,
              public dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetPersona();
  }

  GetPersona(){
    this._Service.getPersonas().subscribe(data => {
      
      this.dataSource.data = data;
      
    }, error => {
      this.toastr.info('Atencion', error)
      
    }
    );
  }
  editPersona(cvePersona:number) {
    const dialogRef = this.dialog.open(AgregarPersonaModalComponent,{
      data:{CvePersona:cvePersona}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.toastr.success('Confirmación', 'Se Guardo Correctamente');
      this.GetPersona();
    });
    
  }

  DeletePersona(cvePersona:number){
    this._Service.DeletePersona(cvePersona).subscribe(res => {
      this.toastr.success('Confirmación', 'Se elimino Correctamente');
      this.GetPersona();
    },error =>
    this.toastr.info('Atencion', error)
    
    );
  }

}
