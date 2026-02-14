package com.Craveo.request;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Service;

@Data
@Getter
@Service

public class loginrequest {
    private String email;
    private String password;

}
