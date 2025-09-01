package com.jose.springboot.webapp.springboot_diabetico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.jose.springboot.webapp.springboot_diabetico.model.RegistroAzucar;
import java.util.List;

@Repository
public interface RegistroAzucarRepository extends JpaRepository<RegistroAzucar, Long>{

    // Método para encontrar todos los registros de azúcar de un paciente específico
    List<RegistroAzucar> findByPacienteId(Long pacienteId);

}
