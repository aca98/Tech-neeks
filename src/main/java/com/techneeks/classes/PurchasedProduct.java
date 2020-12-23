package com.techneeks.classes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

public class PurchasedProduct {
    private String id;
    private User user;
    private Product product;
    private LocalDateTime purchaseDate;


    public PurchasedProduct() {
    }

    public PurchasedProduct(User user, Product product, LocalDateTime purchaseDate) {
        this.user = user;
        this.product = product;
        this.purchaseDate = purchaseDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime dateOfPurchase) {
        this.purchaseDate = dateOfPurchase;
    }

    @Override
    public String toString() {
        return "PurchasedProduct{" +
                "user=" + user +
                ", product=" + product +
                ", dateOfPurchase=" + purchaseDate +
                '}';
    }

    public void setId(String id) {
        this.id = id;
    }

    @Id
    public String getId() {
        return id;
    }
}
