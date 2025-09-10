
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Paciente, RegistroAzucar, PacienteService } from '../paciente.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historico-azucar',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './historico-azucar.html',
  styleUrls: ['./historico-azucar.css']
})
export class HistoricoAzucarComponent implements OnInit, OnChanges {
  @Input() paciente: Paciente | null = null; // Paciente cuyo historial se va a mostrar
  @Output() registroAdded = new EventEmitter<void>(); // Emite cuando se añade un registro
  @Output() registroDeleted = new EventEmitter<void>(); // Emite cuando se elimina un registro

  historico: RegistroAzucar[] = [];
  newValorAzucar: number | null = null;
  newComentario: string='';
  newFechaToma: string | null = null;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    // Se carga el historial inicial si ya hay un paciente
    if (this.paciente && this.paciente.id) {
      this.loadHistorico(this.paciente.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Carga el historial cada vez que el paciente de entrada cambia
    if (changes['paciente'] && changes['paciente'].currentValue && this.paciente?.id) {
      this.loadHistorico(this.paciente.id);
    }
  }

  loadHistorico(pacienteId: number): void {
    this.pacienteService.getHistoricoAzucar(pacienteId).subscribe(
      (data) => {
        this.historico = data.sort((a, b) => {
          // Ordenar por fecha de registro descendente (más reciente primero)
          const dateA = a.fechaRegistro ? new Date(a.fechaRegistro).getTime() : 0;
          const dateB = b.fechaRegistro ? new Date(b.fechaRegistro).getTime() : 0;
          return dateB - dateA;
        });
      },
      (error) => {
        console.error('Error al cargar el histórico de azúcar', error);
      }
    );
  }

  addRegistro(): void {
    if (this.paciente && this.paciente.id && this.newValorAzucar !== null && this.newValorAzucar > 0 && this.newFechaToma) {
      this.pacienteService.addRegistroAzucar(this.paciente.id, this.newValorAzucar, this.newComentario, this.newFechaToma).subscribe(
        () => {
          console.log('Registro de azúcar añadido con éxito');
          this.newValorAzucar = null; // Limpia el input
          this.newComentario = '';
          this.newFechaToma = null; // Limpia el campo después de añadir
          this.loadHistorico(this.paciente!.id!); // Recarga el historial
          this.registroAdded.emit(); // Notifica al padre
        },
        (error) => {
          console.error('Error al añadir registro de azúcar', error);
        }
      );
    } else {
      alert('Por favor, ingresa un valor de azúcar válido y asegúrate de que un paciente esté seleccionado.');
    }
  }

  deleteRegistro(registroId: number | undefined): void {
    if (registroId && confirm('¿Estás seguro de que quieres eliminar este registro de azúcar?')) {
      this.pacienteService.deleteRegistroAzucar(registroId).subscribe(
        () => {
          console.log('Registro de azúcar eliminado con éxito');
          if (this.paciente && this.paciente.id) {
            this.loadHistorico(this.paciente.id); // Recarga el historial
            this.registroDeleted.emit(); // Notifica al padre
          }
        },
        (error) => {
          console.error('Error al eliminar registro de azúcar', error);
        }
      );
    }
  }
}