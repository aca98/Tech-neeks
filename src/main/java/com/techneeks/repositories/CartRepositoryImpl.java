package com.techneeks.repositories;

import com.techneeks.classes.Cart;
import com.techneeks.classes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class CartRepositoryImpl implements CartRepository {

    @Autowired
    EntityManager entityManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Cart> getAllCarts() {
        return null;
    }

    @Override
    public Cart getCart(String username) {
        return null;
    }

    @Override
    public void PurchaseCart(int cartId) {

    }

    @Override
    @Transactional
    public void addToCart(User user, int amount, int productId) {
        System.out.println("Rep: "+user);
        entityManager.createNativeQuery("insert into cart(amount, id_product, user_email) values(?,?,? )")
                .setParameter(1, amount)
                .setParameter(2, productId)
                .setParameter(3, user.getEmail()).executeUpdate();
    }
}
