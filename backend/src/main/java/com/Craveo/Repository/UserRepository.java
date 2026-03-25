package com.Craveo.Repository;

import com.Craveo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

//We extend JpaRepository so that we don’t have to write database code— Spring gives us save, fetch, update, and delete automatically.
public interface UserRepository extends JpaRepository<User,Long> {

    public User findByEmail(String username);

}
