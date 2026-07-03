package com.Craveo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;

@Component
public class DatabaseMigrationRunner implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try (Connection connection = jdbcTemplate.getDataSource().getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            
            // Check lowercase 'address' and 'user_id'
            boolean columnExists = false;
            try (ResultSet rs = metaData.getColumns(null, null, "address", "user_id")) {
                if (rs.next()) {
                    columnExists = true;
                }
            }
            // Check uppercase 'ADDRESS' and 'USER_ID' for databases like Oracle/H2
            if (!columnExists) {
                try (ResultSet rs = metaData.getColumns(null, null, "ADDRESS", "USER_ID")) {
                    if (rs.next()) {
                        columnExists = true;
                    }
                }
            }
            
            if (!columnExists) {
                System.out.println("--- DB MIGRATION: Adding user_id column to address table ---");
                jdbcTemplate.execute("ALTER TABLE address ADD COLUMN user_id BIGINT");
                System.out.println("--- DB MIGRATION: Success ---");
            } else {
                System.out.println("--- DB MIGRATION: Column user_id already exists in address table ---");
            }
        } catch (Exception e) {
            System.err.println("--- DB MIGRATION: Failed to verify/run migration: " + e.getMessage() + " ---");
        }
    }
}
