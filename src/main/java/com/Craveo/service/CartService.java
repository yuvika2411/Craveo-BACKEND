package com.Craveo.service;

import com.Craveo.model.Cart;
import com.Craveo.model.CartItem;
import com.Craveo.request.AddCartItemRequest;

public interface CartService {

    public CartItem addItemtoCart(AddCartItemRequest req, String jwt) throws Exception;
    public CartItem updateCartItemQuantity(Long Id, int quanity) throws Exception;
    public Cart removeItem(Long id, String jwt) throws Exception;
    public Long calculateCartTotal(Cart cart) throws Exception;
    public Cart findCartById(Long id) throws Exception;
    public Cart findCartByUserId(Long userId) throws Exception;
    public Cart clearCart(Long userId) throws Exception;


}
