import { Component, OnInit } from '@angular/core';
import { Paciente, PacienteService } from '../paciente.service';
import { CommonModule } from '@angular/common';
import { PacienteFormComponent } from '../paciente-form/paciente-form';
import { HistoricoAzucarComponent } from '../historico-azucar/historico-azucar'; // Nuevo

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, PacienteFormComponent, HistoricoAzucarComponent],
  templateUrl: './paciente-list.html',
  styleUrls: ['./paciente-list.css']
})
export class PacienteListComponent implements OnInit {
  pacientes: Paciente[] = [];
  selectedPaciente: Paciente | null = null;
  selectedPacienteForHistorico: Paciente | null = null; // Para mostrar el historial

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes(): void {
    this.pacienteService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error al cargar pacientes', error);
      }
    );
  }

  editPaciente(paciente: Paciente): void {
    this.selectedPaciente = { ...paciente }; // Copia para edición
    this.selectedPacienteForHistorico = null; // Oculta el historial si se está editando
  }

  deletePaciente(id: number | undefined): void {
    if (id) {
      if (confirm('¿Estás seguro de que quieres eliminar este paciente y todos sus registros de azúcar?')) {
        this.pacienteService.deletePaciente(id).subscribe(
          () => {
            console.log('Paciente eliminado con éxito');
            this.loadPacientes();
            this.selectedPaciente = null;
            this.selectedPacienteForHistorico = null;
          },
          (error) => {
            console.error('Error al eliminar paciente', error);
          }
        );
      }
    }
  }

  onPacienteSaved(): void {
    this.selectedPaciente = null; // Limpiar el formulario después de guardar
    this.loadPacientes(); // Recargar la lista
  }

  showHistorico(paciente: Paciente): void {
    this.selectedPacienteForHistorico = paciente;
    this.selectedPaciente = null; // Oculta el formulario de edición/creación
  }
}
