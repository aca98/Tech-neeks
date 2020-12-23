package com.techneeks.repositories;

import com.techneeks.classes.Cart;
import com.techneeks.classes.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {

    public User getUserByUsername(String email);
    public User getUserByEmail(String email);
    public void changePassword(String username,String password);
    public List<Cart> getUserHistory(String username);
    public void addUserGuest(User user);
    public int addUser(User user);
    public void addAdmin(User user);
    public List<User> getAllUsers();
    public void changeToGuest(User user);
    public List<User> searchUsers(String query);
    public void updateUser(User user);

}
