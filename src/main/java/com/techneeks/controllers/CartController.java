package com.techneeks.controllers;

import com.techneeks.classes.Cart;
import com.techneeks.classes.User;
import com.techneeks.repositories.CartRepository;
import com.techneeks.repositories.UserRepository;
import org.codehaus.jackson.annotate.JsonAnyGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(value = "*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/cart")
    public Cart getCart(@RequestParam String username){
        return cartRepository.getCart(username);
    }

    @PostMapping(value = "/purchaseCart",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> purchaseCart(@RequestBody CartPayload payload){


            if(!payload.products.isEmpty()){
                try {
                    if(userRepository.getUserByEmail(payload.user.getEmail()) == null){
                        throw new Exception();
                    }
                }catch (Exception e){
                    e.printStackTrace();
                    userRepository.addUserGuest(payload.user);
                }

                for (Object o : payload.products.keySet().toArray()) {
                    cartRepository.addToCart(payload.user, Integer.parseInt(payload.products.get((String)o)),Integer.parseInt((String)o));
                }
                return ResponseEntity.ok("Narudžbina je uspešna, dodatne informacije su poslate na vaš mail");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Greška: Niste stavili ni jedan proizvod u korpu");
            }

    }

    public static class CartPayload{
        public User user;
        public Map<String,String> products;
    }
}
