import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UniversidadService } from '../Services/universidad.service';

//Componentes
import { AgregarPersonaModalComponent } from "../Modal/agregar-persona-modal/agregar-persona-modal.component";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  

  constructor(private _Service:UniversidadService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  

}
