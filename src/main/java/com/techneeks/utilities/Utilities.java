package com.techneeks.utilities;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.techneeks.classes.User;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.NotFileFilter;
import org.apache.commons.io.filefilter.WildcardFileFilter;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public final class Utilities {
    public static String DEFAULT_IMAGE_DIRECTORY = "./src/main/resources/static/images/";
    public static String IMAGE_DIRECTORY = "src/main/resources/media/";
//    public static String IMAGE_DIRECTORY = System.getenv("IMAGE_PATH");

//    public static String IMAGE_DIRECTORY = "./classes/media/";

    public static String createJWT(String username) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("tech-neeks1234!?-spring");
            String token = JWT.create()
                    .withIssuer("auth0").withClaim("username",username)
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception){
            return "Invalid Signing configuration Couldn't convert Claims.";
        }
    }
    public static boolean isTokenValid(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("tech-neeks1234!?-spring");
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("auth0")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(token);
            return true;
        } catch (JWTVerificationException exception) {
           return false;
        }
    }
    public static void deleteImages(int id) throws IOException {
//       List list = Arrays.asList(FileUtils.listFiles(Paths.get(Utilities.IMAGE_DIRECTORY).toFile(), new WildcardFileFilter(new String[]{id+"-*.png","*.jpg"}),new NotFileFilter(DirectoryFileFilter.DIRECTORY)).toArray());
       Iterator iterator = FileUtils.iterateFiles(Paths.get(Utilities.IMAGE_DIRECTORY).toFile(), new WildcardFileFilter(new String[]{id+"-*.png",id+"-*.jpg"}),new NotFileFilter(DirectoryFileFilter.DIRECTORY));
           iterator.forEachRemaining(o -> {
               try {
                   FileUtils.forceDelete(new File(o.toString()));
                   System.out.println("deleted "+ o.toString());
               } catch (IOException e) {
                   e.printStackTrace();
               }
           });
    }


}
