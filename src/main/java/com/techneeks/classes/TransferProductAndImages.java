package com.techneeks.classes;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class TransferProductAndImages implements Serializable {
    private Product product;
    private List<String> images;

    public TransferProductAndImages(Product product) {
        this.product = product;
        this.images = new ArrayList<String>();
    }

    public TransferProductAndImages(Product product, List<String> images) {
        this.product = product;
        this.images = images;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "TransferProductAndImages{" +
                "product=" + product +
                ", images=" + images +
                '}';
    }
}
