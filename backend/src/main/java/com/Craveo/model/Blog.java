package com.Craveo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 5000)
    private String content;
    
    private String imageUrl;
    
    private String author;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();
}
