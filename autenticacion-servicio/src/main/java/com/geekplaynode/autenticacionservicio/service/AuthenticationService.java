package com.geekplaynode.autenticacionservicio.service;

import com.geekplaynode.autenticacionservicio.client.ProfileServiceClient; // ← AGREGAR
import com.geekplaynode.autenticacionservicio.dto.AuthResponse;
import com.geekplaynode.autenticacionservicio.dto.LoginRequest;
import com.geekplaynode.autenticacionservicio.dto.RegisterRequest;
import com.geekplaynode.autenticacionservicio.model.Role;
import com.geekplaynode.autenticacionservicio.model.User;
import com.geekplaynode.autenticacionservicio.repository.UserRepository;
import com.geekplaynode.autenticacionservicio.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final ProfileServiceClient profileServiceClient; // ← AGREGAR

    @Value("${geekplay.admin.secret}")
    private String adminSecretKey;

    public AuthResponse register(RegisterRequest request) {
        
        // --- LÓGICA DE SEGURIDAD PARA ROLES ---
        Role role = Role.USER;

        if (request.getEmail() != null && request.getEmail().endsWith("@geekplay.com")) {
            if (request.getAdminKey() != null && request.getAdminKey().equals(adminSecretKey)) {
                role = Role.ADMIN;
            }
        }

        var user = User.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .baneado(false)
                .build();

        User savedUser = userRepository.save(user); // ← GUARDAR Y OBTENER EL ID

        // ✨ NUEVO: Crear el perfil en ProfileService
        profileServiceClient.createProfile(
                savedUser.getId(),
                savedUser.getNombre(),
                savedUser.getEmail(),
                savedUser.getRole()
        );

        var jwtToken = jwtUtils.generateToken(savedUser);

        return AuthResponse.builder()
                .token(jwtToken)
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .nombre(savedUser.getNombre())
                .role(savedUser.getRole().name())
                .build();
    }

    public AuthResponse authenticate(LoginRequest request) {
        // Primero verificar si el usuario existe y está baneado
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        // Verificar si el usuario está baneado ANTES de validar la contraseña
        if (user.getBaneado() != null && user.getBaneado()) {
            String mensaje = "⛔ Tu cuenta ha sido suspendida.";
            if (user.getMotivoBaneo() != null && !user.getMotivoBaneo().isEmpty()) {
                mensaje += "\n\nMotivo: " + user.getMotivoBaneo();
            }
            mensaje += "\n\nSi crees que esto es un error, contacta con el administrador.";
            throw new RuntimeException(mensaje);
        }

        // Ahora validar las credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var jwtToken = jwtUtils.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .email(user.getEmail())
                .nombre(user.getNombre())
                .role(user.getRole().name())
                .build();
    }
}