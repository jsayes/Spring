import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Paciente, PacienteService } from '../paciente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './paciente-form.html',
  styleUrls: ['./paciente-form.css']
})
export class PacienteFormComponent implements OnChanges {
  @Input() paciente: Paciente | null = null;
  @Output() pacienteSaved = new EventEmitter<void>();

  currentPaciente: Paciente = { nombre: '', apellido: '' }; // Ya no incluye valorAzucar
  isEditMode: boolean = false;

  constructor(private pacienteService: PacienteService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paciente'] && changes['paciente'].currentValue) {
      this.currentPaciente = { ...changes['paciente'].currentValue };
      this.isEditMode = true;
    } else {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.currentPaciente.id) {
      this.pacienteService.updatePaciente(this.currentPaciente.id, this.currentPaciente).subscribe(
        () => {
          console.log('Paciente actualizado con éxito');
          this.pacienteSaved.emit();
          this.resetForm();
        },
        (error) => {
          console.error('Error al actualizar paciente', error);
        }
      );
    } else {
      this.pacienteService.addPaciente(this.currentPaciente).subscribe(
        () => {
          console.log('Paciente agregado con éxito');
          this.pacienteSaved.emit();
          this.resetForm();
        },
        (error) => {
          console.error('Error al agregar paciente', error);
        }
      );
    }
  }

  resetForm(): void {
    this.currentPaciente = { nombre: '', apellido: '' };
    this.isEditMode = false;
  }
}