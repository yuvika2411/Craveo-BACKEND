package com.Craveo.service;

import com.Craveo.model.Order;
import com.stripe.exception.StripeException;

public interface PaymentService {
    public String createPaymentLink(Order order) throws StripeException;
}
