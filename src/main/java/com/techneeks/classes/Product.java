package com.techneeks.classes;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


//@NamedStoredProcedureQuery(name = "add_product",procedureName = "add_product",resultClasses= {int.class},parameters = {
//        @StoredProcedureParameter(name="name", type=String.class, mode= ParameterMode.IN),
//        @StoredProcedureParameter(name="id", type=int.class, mode= ParameterMode.OUT)
//})@JsonFilter("productFilter")
//@JsonFilter("productFilter")
@Table(name = "product")
@Entity
@SQLDelete(sql = "UPDATE product SET deleted = true WHERE idproduct = ?", check = ResultCheckStyle.COUNT)
//@Where(clause = "deleted != 1")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product", updatable = false, nullable = false)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "price")
    private float price;
    @Column(name = "image_count")
    private int imageCount;
    @Column(name = "type")
    private String type;
    @Column(name = "brand")
    private String brand;
    @Column(name = "discount")
    private int discount;
    @Column(name = "deleted")
    @JsonIgnore
    private boolean deleted;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<ProductAttribute> attribute;


    public Product() {}


    public Product(String name, float price, int imageCount, String type, String brand, int discount, boolean deleted, List<ProductAttribute> attribute) {
        this.id = 0;
        this.name = name;
        this.price = price;
        this.imageCount = imageCount;
        this.type = type;
        this.brand = brand;
        this.discount = discount;
        this.deleted = deleted;
        this.attribute = attribute;
    }

    public Product(String name, float price, int imageCount, String type, String brand, List<ProductAttribute> attribute) {
       this.id= 0;
        this.name = name;
        this.price = price;
        this.imageCount = imageCount;
        this.type = type;
        this.brand = brand;
        this.attribute = attribute;
    }

    public Product(String name, float price, int imageCount, List<ProductAttribute> attribute) {
        this.id= 0;
        this.name = name;
        this.price = price;
        this.imageCount = imageCount;
        this.type = "";
        this.brand = "";
        this.attribute = attribute;
    }

    public Product(String name, float price, int imageCount, String type, String brand) {
        this.name = name;
        this.price = price;
        this.imageCount = imageCount;
        this.type = type;
        this.brand = brand;
        this.attribute = new ArrayList<ProductAttribute>();

    }

    public int getId() {
        return id;
    }

    public float getPrice() {
        return price;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ProductAttribute> getAttribute() {
        return attribute;
    }

    public void addAttribute(ProductAttribute attribute) {
        this.attribute.add(attribute);
    }

    public void setAttribute(List<ProductAttribute> attributes) {
        this.attribute = attributes;
    }

    public int getImageCount() {
        return imageCount;
    }

    public void setImageCount(int image_count) {
        this.imageCount = image_count;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }


    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
                ", imageCount=" + imageCount +
                ", type='" + type + '\'' +
                ", brand='" + brand + '\'' +
                ", attribute=" + attribute +
                '}';
    }
}
