package com.techneeks.controllers;

import com.google.gson.Gson;
import com.techneeks.utilities.Utilities;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@CrossOrigin(value = "*")
@RestController

public class GeneralController {

    @Autowired
    private Gson gson;

    @GetMapping("/banner")
    @ResponseBody
    public String getBanner(){
        try {
            List<String> bannerList = new ArrayList<String>();
            byte[] banner = FileUtils.readFileToByteArray(new File(Utilities.IMAGE_DIRECTORY+ "logo\\banner\\tach_neeks_banner_2.png"));
            byte[] smallBanner = FileUtils.readFileToByteArray(new File(Utilities.IMAGE_DIRECTORY+"logo\\banner\\small-banner.webp"));

            String encodedBanner = Base64.getEncoder().encodeToString(banner);
            String encodedSmallBanner = Base64.getEncoder().encodeToString(smallBanner);

            bannerList.add(encodedBanner);
            bannerList.add(encodedSmallBanner);
            System.out.println(gson.toJson(bannerList));
            return gson.toJson(bannerList);
        } catch (IOException e) {
            return e.toString();

        }
    }
    @GetMapping(value = "/small-banner")
    @ResponseBody
    public String getSmallBanner(){
        try {
            byte[] banner = FileUtils.readFileToByteArray(new File(Utilities.IMAGE_DIRECTORY+"logo\\banner\\small-banner.webp"));
            String encoded = Base64.getEncoder().encodeToString(banner);
            return encoded;
        } catch (IOException e) {
            return e.toString();

        }
    }
    @GetMapping(value = "/images", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getAllImages(@RequestParam String image) throws IOException {
        System.out.println(Utilities.IMAGE_DIRECTORY+image);
//        System.out.println(Arrays.toString(FileUtils.readFileToByteArray(Paths.get(Utilities.IMAGE_DIRECTORY + test).toFile())));
//        return new byte[1];
        return FileUtils.readFileToByteArray(Paths.get(Utilities.IMAGE_DIRECTORY + image).toFile());
    }

}
