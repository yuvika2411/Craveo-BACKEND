package com.Craveo.service;

import com.Craveo.Repository.CartItemRepository;
import com.Craveo.Repository.CartRepository;
import com.Craveo.model.Cart;
import com.Craveo.model.CartItem;
import com.Craveo.model.Food;
import com.Craveo.model.User;
import com.Craveo.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImp implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemtoCart(AddCartItemRequest req, String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        Food food= foodService.findFoodById(req.getFoodId());
        Cart cart= cartRepository.findByCustomerId(user.getId());

        for(CartItem cartItem: cart.getItems()){
            if(cartItem.getFood().equals(food)){
                int newQuantity= cartItem.getQuantity()+req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }

        CartItem newCartItem= new CartItem();
        newCartItem.setCart(cart);
        newCartItem.setFood(food);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity()* food.getPrice());

        CartItem savedCartItem= cartItemRepository.save(newCartItem);

        cart.getItems().add(savedCartItem);
        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quanity) throws Exception {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if(cartItemOptional.isEmpty()){
            throw new Exception("Cart Item not found");
        }
        CartItem item= cartItemOptional.get();
        item.setQuantity(quanity);
        item.setTotalPrice(item.getFood().getPrice()*quanity);

        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItem(Long id, String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        Cart cart= cartRepository.findByCustomerId(user.getId());

        Optional<CartItem> cartItemOptional= cartItemRepository.findById(id);
        if(cartItemOptional.isEmpty()){
            throw new Exception("Cart item not found");
        }
        CartItem item= cartItemOptional.get();
        cart.getItems().remove(item);
        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotal(Cart cart) throws Exception {
        Long total= 0L;
        for(CartItem item: cart.getItems()){
            total+=item.getFood().getPrice()*item.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart= cartRepository.findById(id);
        if(optionalCart.isEmpty()){
            throw new Exception("Cart not found with this id "+id);
        }
        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        User user= userService.findUserByJwtToken(userId);
        return cartRepository.findByCustomerId(user.getId());
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart = findCartByUserId(userId);
        cart.getItems().clear();

        return cartRepository.save(cart);
    }
}
