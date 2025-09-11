package com.jose.springboot.webapp.springboot_diabetico.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.jose.springboot.webapp.springboot_diabetico.model.Paciente;
import com.jose.springboot.webapp.springboot_diabetico.model.RegistroAzucar;
import com.jose.springboot.webapp.springboot_diabetico.repository.PacienteRepository;
import com.jose.springboot.webapp.springboot_diabetico.repository.RegistroAzucarRepository;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/registros-azucar")


public class RegistroAzucarController {

@Autowired
    private RegistroAzucarRepository registroAzucarRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping("/paciente/{pacienteId}")
    public List<RegistroAzucar> getHistoricoByPacienteId(@PathVariable Long pacienteId) {
        return registroAzucarRepository.findByPacienteId(pacienteId);
    }

    @PostMapping("/paciente/{pacienteId}")
    public ResponseEntity<RegistroAzucar> addRegistroToPaciente(
            @PathVariable Long pacienteId,
            @RequestBody RegistroAzucar registroAzucar) {

        Optional<Paciente> optionalPaciente = pacienteRepository.findById(pacienteId);
        if (optionalPaciente.isPresent()) {
            Paciente paciente = optionalPaciente.get();
            paciente.addRegistroAzucar(registroAzucar); // Asocia el registro al paciente
            pacienteRepository.save(paciente); // Guarda el paciente (que a su vez guarda el registro)
            return ResponseEntity.status(HttpStatus.CREATED).body(registroAzucar);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente no encontrado con ID: " + pacienteId);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistroAzucar(@PathVariable Long id) {
        if (registroAzucarRepository.existsById(id)) {
            registroAzucarRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }    

}
