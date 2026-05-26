package com.example.backend.controller;


import com.example.backend.model.Producto;
import com.example.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository repo;

    @GetMapping
    public List<Producto> getdAll() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<Producto> create(@RequestBody Producto p) {
        return ResponseEntity.ok(repo.save(p));
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent()
                .build();
    }
}
