package com.techneeks.classes;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonFilter;

import javax.persistence.*;
import java.time.LocalDateTime;
@JsonFilter("cartFilter")
@Table(name = "cart")
@Entity
public class Cart {
    @Id
    @GeneratedValue
    @Column(name = "id_cart",table ="cart")
    private int idCart;
    @ManyToOne()
    @JoinColumn(name= "user_email")
    @JsonIgnore
    private User user;
    @ManyToOne()
    @JoinColumn(name= "id_product")
    private Product product;
    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;
    @Column(name = "amount")
    private int amount;

    public Cart() {
    }

    public Cart(int idCart, User user, Product product, LocalDateTime purchaseDate, int amount) {
        this.idCart = idCart;
        this.user = user;
        this.product = product;
        this.purchaseDate = purchaseDate;
        this.amount = amount;
    }
    public Cart(User user, Product product, int amount) {
        this.user = user;
        this.product = product;
        this.amount = amount;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getIdCart() {
        return idCart;
    }

    public void setIdCart(int id) {
        this.idCart = id;
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

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + idCart +
                ", user=" + user +
                ", product=" + product +
                ", purchaseDate=" + purchaseDate +
                '}';
    }
}
