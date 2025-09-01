package com.jose.springboot.webapp.springboot_diabetico.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data // Genera getters, setters, toString, equals y hashCode

public class RegistroAzucar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double valorAzucar;
    private LocalDateTime fechaRegistro;
    private String comentario;

    @ManyToOne(fetch = FetchType.LAZY) // Relación Muchos a Uno con Paciente
    @JoinColumn(name = "paciente_id") // Columna de la clave foránea en esta tabla
    @ToString.Exclude // Evita recursión infinita en toString()
    @JsonBackReference
    private Paciente paciente;

    public RegistroAzucar() {
        this.fechaRegistro = LocalDateTime.now(); // Se inicializa automáticamente
    }   

}
