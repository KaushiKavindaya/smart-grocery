package com.smartgrocery.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public static class RegisterRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a complete email, like alex@example.com")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Use 8+ characters, a number and an uppercase letter")
        private String password;

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class ForgotPasswordRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email")
        private String email;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class AuthResponse {
        private String token;
        private Long userId;
        private String fullName;
        private String email;
        private String currency;

        public AuthResponse(String token, Long userId, String fullName, String email, String currency) {
            this.token = token;
            this.userId = userId;
            this.fullName = fullName;
            this.email = email;
            this.currency = currency;
        }

        public String getToken() { return token; }
        public Long getUserId() { return userId; }
        public String getFullName() { return fullName; }
        public String getEmail() { return email; }
        public String getCurrency() { return currency; }
    }
}