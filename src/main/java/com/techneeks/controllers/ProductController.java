package com.techneeks.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.google.gson.Gson;
import com.techneeks.classes.Product;
import com.techneeks.classes.TransferProductAndImages;
import com.techneeks.repositories.ProductRepository;
import com.techneeks.utilities.Utilities;
import org.apache.commons.compress.utils.IOUtils;
import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.map.ser.impl.PropertySerializerMap;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import org.codehaus.jackson.map.ser.impl.JsonSerializerMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ser.FilterProvider;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(value = "*", origins = "*")
public class ProductController {

    @Autowired
    Gson gson;
    @Autowired
    ProductRepository productRepository;

    @GetMapping(value = "/filterted/{filters}")
    public void getFilteredProducts(@RequestParam String filter, @PathVariable String filters) {
        System.out.println("Filter : " + filter + "Path : " + filters);
    }

    @PostMapping(value = "/filter")
    public MappingJacksonValue getFilteredProducts(@RequestParam String filter) {
        System.out.println("Ass" + filter);
        try {
            List<Product> products = productRepository.getFilteredProducts(filter);
//            System.out.println(products);
            List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(products);
//            System.out.println(transferProductAndImages);
            return filterOutAttributeFromProduct(transferProductAndImages);
        } catch (IOException e) {
            e.printStackTrace();
            return new MappingJacksonValue(e);
        }
    }

    @GetMapping(value = "/product_filters")
    public Map<String, List<List<String>>> getFilters() {

        Map<String, List<List<String>>> test = productRepository.getFilters();
        System.out.println(productRepository.getDefaultFilters());
        return test;
    }

    @GetMapping(value = "/defaultFilters")
    public Map<String, List<List<String>>> getFiltersDefault() {

        Map<String, List<List<String>>> test = productRepository.getDefaultFilters();
        System.out.println(test);
        return test;
    }

    @Transactional
    @GetMapping(value = "/")
    public MappingJacksonValue getProducts() {
        try {
            List<Product> products = productRepository.getFilteredProducts("");
            List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(products);
            return filterOutAttributeFromProduct(transferProductAndImages);
        } catch (IOException e) {
            e.printStackTrace();
            return new MappingJacksonValue(e);
        }
    }

    public List<TransferProductAndImages> createTransferProductAndImages(List<Product> products) throws IOException {
        List<TransferProductAndImages> transferProductAndImages = new ArrayList<>();
        for (Product product : products) {
            byte[] fileContent = FileUtils.readFileToByteArray(Paths.get(Utilities.IMAGE_DIRECTORY + product.getId() + "-0.png").toFile());
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            TransferProductAndImages transfer = new TransferProductAndImages(product);
            transfer.getImages().add(encodedString);
            transferProductAndImages.add(transfer);
        }
        return transferProductAndImages;
    }


    public MappingJacksonValue filterOutAttributeFromProduct(List<TransferProductAndImages> transferProductAndImages) {
        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.serializeAllExcept("attribute");
        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("productFilter", filter);
        MappingJacksonValue value = new MappingJacksonValue(transferProductAndImages);
        value.setFilters(filterProvider);
        return value;
    }


    @GetMapping("/products")
    public TransferProductAndImages getProduct(@RequestParam int id) throws IOException {
        Product product = productRepository.getProduct(id);
        TransferProductAndImages transfer = new TransferProductAndImages(product);
        for (int i = 0; i < product.getImageCount(); i++) {
            byte[] fileContent = FileUtils.readFileToByteArray(Paths.get(Utilities.IMAGE_DIRECTORY + product.getId() + "-" + i + ".png").toFile());
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            transfer.getImages().add(encodedString);
        }
        return transfer;
    }
    @GetMapping("/list")
    public MappingJacksonValue getListProductsBy(@RequestParam String query) throws IOException {
        List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(productRepository.getAllProducts(query));
        return filterOutAttributeFromProduct(transferProductAndImages);
    }
    @GetMapping("/all_products")
    public MappingJacksonValue allProducts() throws IOException {
        List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(productRepository.adminAllProducts());
        return filterOutAttributeFromProduct(transferProductAndImages);
    }

    @GetMapping("/id")
    @ResponseBody
    public String getLastID() {
        return gson.toJson(productRepository.getLastID());
    }


    public void StoreImages(List<String> imageList) throws IOException {
        int uniqueID = productRepository.getLastID();
        for (int i = 0; i < imageList.size(); i++) {
            String imageName = String.format("%d-%d.png", uniqueID, i);
            Files.write(Paths.get(Utilities.IMAGE_DIRECTORY, imageName), Base64.getDecoder().decode(imageList.get(i)));
        }
    }

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addProduct(@RequestBody TransferProductAndImages payload) {
        productRepository.addProduct(payload.getProduct());
        try {
            StoreImages(payload.getImages());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(200).body("Proizvod uspešno dodat");
    }

    @PostMapping(value = "/updateproduct", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateProduct(@RequestBody TransferProductAndImages payload, HttpServletResponse response, HttpServletRequest request) {
        try {
            Utilities.deleteImages(payload.getProduct().getId());
            for (int i = 0; i < payload.getImages().size(); i++) {
                String imageName = String.format("%d-%d.png", payload.getProduct().getId(), i);
                Files.write(Paths.get(Utilities.IMAGE_DIRECTORY, imageName), Base64.getDecoder().decode(payload.getImages().get(i)));
            }
            productRepository.changeProduct(payload.getProduct());
        } catch (IOException e) {
            e.printStackTrace();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return ResponseEntity.status(200).body("Proizvod uspešno ažuriran");
    }

    @GetMapping(value = "/delete_product")
    public ResponseEntity<String> deleteProduct(@RequestParam int id) {
        productRepository.deleteProduct(id);
        return ResponseEntity.ok("Proizvod uspešno obrisan");
    }

    @GetMapping(value = "/search")
    public MappingJacksonValue searchProduct(@RequestParam String query) throws IOException {
        List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(productRepository.ProductSearch(query));
        return filterOutAttributeFromProduct(transferProductAndImages);
    }
    @GetMapping(value = "/adminsearch")
    public MappingJacksonValue adminSearchProduct(@RequestParam String query) throws IOException {
        List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(productRepository.adminProductSearch(query));
        return filterOutAttributeFromProduct(transferProductAndImages);
    }
    @GetMapping(value = "/popular")
    public MappingJacksonValue popularProduct() throws IOException {
        List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(productRepository.getPopularProducts());
        return filterOutAttributeFromProduct(transferProductAndImages);
    }
    @GetMapping(value = "/discount_product")
    public MappingJacksonValue discountProduct() throws IOException {
        List<TransferProductAndImages> transferProductAndImages = createTransferProductAndImages(productRepository.getProductsOnDiscount());
        return filterOutAttributeFromProduct(transferProductAndImages);
    }
    @GetMapping(value = "/restore")
    public void restoreProduct(@RequestParam int id){
        productRepository.restoreProduct(id);
    }
}
