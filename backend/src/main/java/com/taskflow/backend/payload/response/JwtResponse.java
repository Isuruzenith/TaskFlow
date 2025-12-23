package com.taskflow.backend.payload.response;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String email;
    private String fullName;

    public JwtResponse(String accessToken, String id, String email, String fullName) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
    }
}
