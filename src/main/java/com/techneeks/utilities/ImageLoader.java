package com.techneeks.utilities;

import com.techneeks.classes.Cart;
import com.techneeks.classes.Product;
import com.techneeks.classes.TransferCartAndImages;
import com.techneeks.classes.TransferProductAndImages;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class ImageLoader {


    public List<TransferProductAndImages> createTransferProductAndImages(List<Product> products) throws IOException {
        List<TransferProductAndImages> transferProductAndImages = new ArrayList<>();
        for (Product product: products) {
            byte[] fileContent = FileUtils.readFileToByteArray(new ClassPathResource("static/images/" + product.getId() + "-0.png").getFile());
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            TransferProductAndImages transfer = new TransferProductAndImages(product);
            transfer.getImages().add(encodedString);
            transferProductAndImages.add(transfer);
        }
        return transferProductAndImages;
    }

    public static List<TransferCartAndImages> createTransferCartAndImages(List<Cart> products) throws IOException {
        List<TransferCartAndImages> transferCartAndImages = new ArrayList<>();
        for (Cart product: products) {
            byte[] fileContent = FileUtils.readFileToByteArray(Paths.get(Utilities.IMAGE_DIRECTORY + product.getProduct().getId() + "-0.png").toFile());
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            TransferCartAndImages transfer = new TransferCartAndImages(product);
            transfer.getImages().add(encodedString);
            transferCartAndImages.add(transfer);
        }
        return transferCartAndImages;
    }
}
