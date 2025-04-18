package com.sims.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.sims.exceptions.CustomAccessDenialHandler;
import com.sims.exceptions.CustomAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

        private final AuthFilter authFilter;
        private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
        private final CustomAccessDenialHandler customAccessDenialHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
                httpSecurity.csrf(AbstractHttpConfigurer::disable)
                                .cors(Customizer.withDefaults())
                                .exceptionHandling(exception -> exception
                                                .accessDeniedHandler(customAccessDenialHandler)
                                                .authenticationEntryPoint(customAuthenticationEntryPoint))
                                .authorizeHttpRequests(request -> request
                                                .requestMatchers("/api/auth/**", // Allow authentication APIs
                                                                "/login.html",
                                                                "/static/**",
                                                                "/index.html", // Allow login page
                                                                "/register.html", // Allow register page
                                                                "/favicon.ico", // Allow favicon.ico
                                                                "/css/**", // Allow CSS files
                                                                "/js/**", // Allow JavaScript files
                                                                "/images/**")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .sessionManagement(manager -> manager
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
                return httpSecurity.build();

        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
                        throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }
}
