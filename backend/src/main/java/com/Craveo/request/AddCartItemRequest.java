package com.Craveo.request;

import lombok.Data;

@Data
public class AddCartItemRequest {

    private Long foodId;
    private int quantity;
}
