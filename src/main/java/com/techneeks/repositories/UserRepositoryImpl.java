package com.techneeks.repositories;

import com.google.common.collect.Maps;
import com.techneeks.classes.Cart;
import com.techneeks.classes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.*;

@Repository
@Transactional
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private EntityManager entityManager;


    @Override
    public User getUserByUsername(String email) {
        return (User) entityManager.createNativeQuery("select * from \"users\" where email = '" + email + "' AND \"authorization_\" != " + 0, User.class).getSingleResult();
    }

    @Override
    public User getUserByEmail(String email) {
        return entityManager.find(User.class, email);
    }

    @Override
    public void changePassword(String username, String password) {
        User user = entityManager.find(User.class, username);
        user.setPassword(password);
        entityManager.persist(user);
    }

    @Override
    public List<Cart> getUserHistory(String email) {
        List list = entityManager.createNativeQuery("select cart.* from users,cart,product where users.email = cart.user_email and cart.id_product = product.id_product and cart.user_email = '" + email + "'", Cart.class).getResultList();
        return list;
    }

    @Override
    public void addUserGuest(User user) {
        user.setAuthority(0);
        entityManager.persist(user);
    }

    @Override
    public void changeToGuest(User user) {
        user.setAuthority(0);
        entityManager.merge(user);
    }
    @Override
    public void updateUser(User user) {
        user.setAuthority(1);
        entityManager.merge(user);
    }

    @Override
    @Transactional
    public int addUser(User user) {
        try{
            User user2 = entityManager.find(User.class, user.getEmail());
            if(user2.getAuthority() >= 1){
                return 0;
            }
            user.setAuthority(1);
            entityManager.merge(user);
            return 1;
        }catch (Exception e){
            user.setAuthority(1);
            entityManager.persist(user);
            return 1;
        }
    }

    @Override
    public void addAdmin(User user) {
        user.setAuthority(2);
        entityManager.persist(user);
    }

    @Override
    public List<User> getAllUsers() {
        return entityManager.createNativeQuery("select * from \"users\"", User.class).getResultList();
    }

    @Override
    public List<User> searchUsers(String query) {
        String formated = query.replace(' ', ',');
        return entityManager.createNativeQuery("select * from \"users\" where to_tsvector(name || ' ' || address || ' ' || email || ' ' || phone_number ) @@ plainto_tsquery('"+formated+"')", User.class).getResultList();

    }
}
