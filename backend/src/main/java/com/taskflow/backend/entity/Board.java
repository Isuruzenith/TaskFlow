package com.taskflow.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "boards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id
    private String id;

    private String title;

    private String ownerId;

    private List<TaskList> columns = new ArrayList<>();

    public Board(String title, String ownerId) {
        this.title = title;
        this.ownerId = ownerId;
    }
}
