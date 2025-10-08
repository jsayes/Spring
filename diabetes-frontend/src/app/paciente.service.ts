import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  // Ya no almacenamos valorAzucar directamente aquí, se hace en RegistroAzucar
  historicoAzucar?: RegistroAzucar[]; // Para mostrar el histórico
}

export interface RegistroAzucar {
  id?: number;
  valorAzucar: number;
  fechaRegistro?: string; // ISO 8601 string
  pacienteId?: number; // Para asociar al paciente al agregar un registro
  comentario?: string;
  fechaToma?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private baseUrl = 'http://backend:8090/api'; // Base URL para ambos controladores

  constructor(private http: HttpClient) { }

  // --- Métodos para Pacientes ---
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseUrl}/pacientes`);
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/pacientes/${id}`);
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.baseUrl}/pacientes`, paciente);
  }

  updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseUrl}/pacientes/${id}`, paciente);
  }

  deletePaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/pacientes/${id}`);
  }

  // --- Métodos para Registros de Azúcar ---
  getHistoricoAzucar(pacienteId: number): Observable<RegistroAzucar[]> {
    return this.http.get<RegistroAzucar[]>(`${this.baseUrl}/registros-azucar/paciente/${pacienteId}`);
  }

  addRegistroAzucar(pacienteId: number, valorAzucar: number, comentario: string='', fechaToma: string = ''): Observable<RegistroAzucar> {
    const registro: RegistroAzucar = { valorAzucar: valorAzucar, comentario: comentario, fechaToma: fechaToma };
    return this.http.post<RegistroAzucar>(`${this.baseUrl}/registros-azucar/paciente/${pacienteId}`, registro);
  }

  deleteRegistroAzucar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/registros-azucar/${id}`);
  }
}
