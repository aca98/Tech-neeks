package com.techneeks.repositories;

import com.techneeks.classes.Cart;
import com.techneeks.classes.Product;
import com.techneeks.classes.User;

import java.util.List;

public interface CartRepository {

    public void addToCart(User user, int amount, int productId);

    public List<Cart> getAllCarts();

    public Cart getCart(String username);

    public void PurchaseCart(int cartId);

}
