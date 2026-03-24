package com.Craveo.service;

import com.Craveo.Repository.*;
import com.Craveo.model.*;
import com.Craveo.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImp implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CartService cartService;

    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {
        Address shipAddress= order.getDeliveryAddress();
        Address savedAddress= addressRepository.save(shipAddress);
        if(!user.getAddresses().contains(savedAddress)){
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        Restaurant restaurant= restaurantService.findRestaurantById(order.getRestaurantId());

        Order createdOrder= new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        Cart cart= cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem items: cart.getItems()){
            OrderItem orderItem= new OrderItem();
            orderItem.setFood(items.getFood());
            orderItem.setIngredients(items.getIngredients());
            orderItem.setQuantity(items.getQuantity());
            orderItem.setTotalPrice(items.getTotalPrice());

            OrderItem savedOrderItem= orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }


        return null;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        return null;
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {

    }

    @Override
    public List<Order> getUsersOrder(Long UserId) throws Exception {
        return List.of();
    }

    @Override
    public List<Order> getRestaurantsOrder(Long restaurantId, String OrderStatus) throws Exception {
        return List.of();
    }
}
