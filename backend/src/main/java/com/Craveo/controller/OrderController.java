package com.Craveo.controller;

import com.Craveo.model.Order;
import com.Craveo.model.User;
import com.Craveo.request.OrderRequest;
import com.Craveo.response.PaymentResponse;
import com.Craveo.service.OrderService;
import com.Craveo.service.PaymentService;
import com.Craveo.service.UserService;
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
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req, user);

        String paymentUrl = paymentService.createPaymentLink(order);
        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(paymentUrl);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // ✅ NEW — called by frontend after Stripe redirects to /payment/success/{orderId}
    // Marks the order as COMPLETED so it doesn't stay PENDING forever
    @GetMapping("/order/{orderId}/confirm-payment")
    public ResponseEntity<Order> confirmPayment(@PathVariable Long orderId,
                                                @RequestHeader("Authorization") String jwt) throws Exception {
        userService.findUserByJwtToken(jwt);
        Order order = orderService.updateOrder(orderId, "COMPLETED");
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}