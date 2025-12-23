package com.taskflow.backend.controller;

import com.taskflow.backend.entity.Board;
import com.taskflow.backend.repository.BoardRepository;
import com.taskflow.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    BoardRepository boardRepository;

    @GetMapping
    public List<Board> getUserBoards() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return boardRepository.findByOwnerId(userDetails.getId());
    }

    @PostMapping
    public Board createBoard(@RequestBody Board board) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        board.setOwnerId(userDetails.getId());
        return boardRepository.save(board);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable String id) {
        Optional<Board> board = boardRepository.findById(id);
        if (board.isPresent()) {
            // Security check: ensure owner matches
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            if (!board.get().getOwnerId().equals(userDetails.getId())) {
                return ResponseEntity.status(403).build();
            }
            return ResponseEntity.ok(board.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
