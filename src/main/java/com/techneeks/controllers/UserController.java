package com.techneeks.controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.techneeks.classes.Cart;
import com.techneeks.classes.TransferCartAndImages;
import com.techneeks.classes.TransferProductAndImages;
import com.techneeks.classes.User;
import com.techneeks.repositories.UserRepository;
import com.techneeks.utilities.ImageLoader;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    public MappingJacksonValue filterForUser(List<TransferCartAndImages> cart) {
        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.serializeAllExcept("product");
        SimpleBeanPropertyFilter filter2 = SimpleBeanPropertyFilter.serializeAllExcept("attribute");

        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("cartFilter", filter).addFilter("productFilter", filter2);

        MappingJacksonValue value = new MappingJacksonValue(cart);
        value.setFilters(filterProvider);
        return value;
    }

    public MappingJacksonValue filterOutAttributeFromProduct(List<TransferProductAndImages> transferProductAndImages) {
        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.serializeAllExcept("attribute");
        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("productFilter", filter);
        MappingJacksonValue value = new MappingJacksonValue(transferProductAndImages);
        value.setFilters(filterProvider);
        return value;
    }

    @GetMapping(value = "/users")
    public User getUser(@RequestParam String email) {
        User as = userRepository.getUserByUsername(email);
        System.out.println("ass" + as);
        return as;
    }

    @GetMapping(value = "/searchusers")
    public List<User> searchUser(@RequestParam String query) {
        return userRepository.searchUsers(query);
    }

    @GetMapping(value = "/everyUser")
    public User getEveryUser(@RequestParam String email) {
        User user = userRepository.getUserByEmail(email);
        return user;
    }

    @GetMapping(value = "/changeUser")
    public void changeToGuest(@RequestParam String email) {
        User user = userRepository.getUserByEmail(email);
        userRepository.changeToGuest(user);
    }

    @GetMapping(value = "/changepassword")
    public String changePassword(@RequestParam String email, @RequestParam String password) {
        try {
            userRepository.changePassword(email, password);
            return "1: Lozinka uspešno promenjena";
        } catch (Exception e) {
            return "0: Problem pri menjanju lozinke";
        }
    }

    @GetMapping(value = "/userhistory")
    public MappingJacksonValue getUserProductHistory(@RequestParam String email) {
        try {
            return filterForUser(ImageLoader.createTransferCartAndImages(userRepository.getUserHistory(email)));
        } catch (IOException e) {

            e.printStackTrace();
            return null;
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.addUser(user) == 1)
            return ResponseEntity.ok("Korisnik uspešno registrovan");
        else
            return ResponseEntity.status(409).body("Email već postoji");

    }

    @PostMapping(value = "/adminregister", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> adminRegisterUser(@RequestBody User user) {
        System.out.println(user);
        try {
            userRepository.addAdmin(user);
            return ResponseEntity.ok("Admin uspešno registrovan");
        } catch (Exception e) {
            return ResponseEntity.status(409).body("Email već postoji");
        }
    }
    @PostMapping(value = "/update_user", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        try {
            userRepository.updateUser(user);
            return ResponseEntity.ok("Podaci uspešno promenjeni");
        } catch (Exception e) {
            return ResponseEntity.status(409).body("Došlo je do greške");
        }
    }

    @GetMapping(value = "/allusers")
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }
}
