package com.Craveo.service;

import com.Craveo.model.Order;
import com.Craveo.model.User;
import com.Craveo.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest orderRequest, User user) throws Exception;
    public Order updateOrder(Long orderId, String orderStatus) throws Exception;
    public void cancelOrder(Long orderId) throws Exception;
    public List<Order> getUsersOrder(Long UserId) throws Exception;
    public List<Order> getRestaurantsOrder(Long restaurantId, String OrderStatus) throws Exception;
    public Order findOrderById( Long orderId) throws Exception;

}
