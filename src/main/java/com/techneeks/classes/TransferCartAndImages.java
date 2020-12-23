package com.techneeks.classes;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class TransferCartAndImages implements Serializable {
    private Cart cart;
    private List<String> images;

    public TransferCartAndImages(Cart cart) {
        this.cart = cart;
        this.images = new ArrayList<String>();
    }

    public TransferCartAndImages(Cart cart, List<String> images) {
        this.cart = cart;
        this.images = images;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
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
                "product=" + cart +
                ", images=" + images +
                '}';
    }
}
