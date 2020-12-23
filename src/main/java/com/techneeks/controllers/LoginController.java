package com.techneeks.controllers;

import com.techneeks.classes.User;
import com.techneeks.repositories.UserRepository;
import com.techneeks.utilities.Utilities;
import org.eclipse.sisu.Mediator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(value = "*")
public class LoginController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping(path = "/login")
    public ResponseEntity<Object> login(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password, HttpServletResponse response) {
        try {
            User user = userRepository.getUserByUsername(email);

            if (user.getPassword().equals(password)) {
                response.addHeader("Token", Utilities.createJWT(user.getEmail()));
                response.setHeader("Access-Control-Expose-Headers", "Token");
                return new ResponseEntity<Object>(user, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Pogrešna lozinka");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Korisnik ne postoji");
        }
    }

    @PostMapping(path = "/validate", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Boolean> validateToken(@RequestParam(name = "token") String token) {
        if (Utilities.isTokenValid(token))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);

    }

}
