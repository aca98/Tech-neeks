package com.techneeks.classes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name="attribute")
@Table(name = "attribute")
public class ProductAttribute implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product_attribute", insertable = false,updatable = false)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "value")
    private String value;
    @Column(name = "important")
    private boolean important;

    public ProductAttribute() {
        this.id = 0;
        this.name = "";
        this.value = "";
        this.important = false;
    }


//    public ProductAttribute(int id, String name, String value, boolean important) {
//        this.id = id;
//        this.name = name;
//        this.value = value;
//        this.important = important;
//    }
    public ProductAttribute( String name, String value, boolean important) {
        this.id = 0;
        this.name = name;
        this.value = value;
        this.important = important;

    }

    public int getId() {
        return id;
    }

//    public void setId(int id) {
//        this.id = id;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public boolean isImportant() {
        return important;
    }

    public void setImportant(boolean important) {
        this.important = important;
    }

    @Override
    public String toString() {
        return "ProductAttribute{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", value='" + value + '\'' +
                ", important=" + important +
                '}';
    }
}
