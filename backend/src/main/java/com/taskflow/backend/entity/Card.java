package com.taskflow.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Card {
    private String id = UUID.randomUUID().toString();
    private String title;
    private String description;
    private int position;

    public Card(String title, String description, int position) {
        this.title = title;
        this.description = description;
        this.position = position;
    }
}
