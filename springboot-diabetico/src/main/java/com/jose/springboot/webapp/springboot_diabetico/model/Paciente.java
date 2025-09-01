package com.jose.springboot.webapp.springboot_diabetico.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data // Genera getters, setters, toString, equals y hashCode

public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
   @ToString.Exclude // Evita recursión infinita en toString()
    @EqualsAndHashCode.Exclude // Evita recursión infinita en equals/hashCode()
    @JsonManagedReference
    private List<RegistroAzucar> historicoAzucar = new ArrayList<>();

    public Paciente() {
    }

    // Método para añadir un registro de azúcar al histórico
    public void addRegistroAzucar(RegistroAzucar registro) {
        historicoAzucar.add(registro);
        registro.setPaciente(this);
    }

    // Método para remover un registro de azúcar
    public void removeRegistroAzucar(RegistroAzucar registro) {
        historicoAzucar.remove(registro);
        registro.setPaciente(null);
    }    


}
