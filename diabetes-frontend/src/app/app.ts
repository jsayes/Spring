import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PacienteListComponent } from './paciente-list/paciente-list';
//import { HttpClient } from '@angular/common/http';
import 'zone.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PacienteListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Gestión de Pacientes Diabéticos con Historial';
}