package com.taskflow.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskList {
    private String id = UUID.randomUUID().toString();
    private String title;
    private List<Card> cards = new ArrayList<>();

    public TaskList(String title) {
        this.title = title;
    }
}
