package com.Craveo.controller;

import com.Craveo.model.CartItem;
import com.Craveo.model.Order;
import com.Craveo.model.User;
import com.Craveo.request.AddCartItemRequest;
import com.Craveo.request.OrderRequest;
import com.Craveo.service.OrderService;
import com.Craveo.service.UserService;
import com.Craveo.response.PaymentResponse;
import com.Craveo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/order")
    private ResponseEntity<PaymentResponse> creatOrder(@RequestBody OrderRequest req,
                                             @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req,user);
        
        String paymentUrl = paymentService.createPaymentLink(order);
        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(paymentUrl);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    @GetMapping("/order/user")
    private ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
