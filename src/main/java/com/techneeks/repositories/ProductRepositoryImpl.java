package com.techneeks.repositories;


import com.google.gson.Gson;
import com.techneeks.classes.Product;
//import com.techneeks.classes.ProductAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
@Transactional
public class ProductRepositoryImpl implements ProductRepository {

    @Autowired
    EntityManager entityManager;
    @Autowired
    Gson gson;
//
//    @Override
//    protected HibernateTemplate createHibernateTemplate(SessionFactory sessionFactory) {
//        return super.createHibernateTemplate(sessionFactory);
//    }
//
//
//    public ProductRepositoryImpl(HibernateTemplate hibernateTemplate) {
//        setHibernateTemplate(hibernateTemplate);
//    }
    public Product getProduct(int id) {
        Product product = entityManager.find(Product.class, id);
        return product;
    }

    @Override
    public List<Product> ProductSearch(String searchQuery) {
        String query = searchQuery.replace(' ',',');
        return (List<Product>) entityManager.createNativeQuery("select distinct product.* from product, product_attribute, \"attribute\"\n" +
                "where product.id_product = product_attribute.product_id_product AND product_attribute.attribute_id_product_attribute = attribute.id_product_attribute\n" +
                "AND product.deleted = false AND to_tsvector(product.\"name\" || ' ' || product.brand || ' ' || attribute.value) @@ plainto_tsquery('"+query+"')",Product.class).getResultList();
    }
    @Override
    public List<Product> adminProductSearch(String searchQuery) {
        String query = searchQuery.replace(' ',',');
        return (List<Product>) entityManager.createNativeQuery("select distinct product.* from product, product_attribute, \"attribute\"\n" +
                "where product.id_product = product_attribute.product_id_product AND product_attribute.attribute_id_product_attribute = attribute.id_product_attribute\n" +
                "AND to_tsvector(product.\"name\" || ' ' || product.brand || ' ' || attribute.value) @@ plainto_tsquery('"+query+"')",Product.class).getResultList();
    }


    @Override
    public List<Product> getAllProducts(String query) {
        return entityManager.createNativeQuery("select * from product where product.id_product in("+query+")", Product.class).getResultList();
    }

    public void addProduct(Product product) {
        entityManager.persist(product);
        entityManager.close();
    }

    @Override
    public List getFilteredProducts(String filterCriteria) {
            String query = "select product.* from attribute,product,product_attribute where attribute.id_product_attribute = product_attribute.attribute_id_product_attribute and product_attribute.product_id_product = product.id_product and product.deleted = false and " + filterCriteria.replace('"', '\'') + " group by product.id_product";
        System.out.println("Query :"+query);
        if (!filterCriteria.isBlank())
            return entityManager.createNativeQuery(query, Product.class).getResultList();
        else
            return entityManager.createNativeQuery("select * from Product where deleted = false", Product.class).getResultList();

    }

    public  Map<String,List<List<String>>> getFilters() {
        List<String> categories = getFilterCategories();
        Map<String,List<List<String>>> filters = new HashMap<>();

        for (String category: categories) {
            String query = "select distinct attribute.value,count(*) as amount from attribute,product,product_attribute\n" +
                    "        where attribute.id_product_attribute = product_attribute.attribute_id_product_attribute AND product_attribute.product_id_product = product.id_product\n" +
                    "               AND product.deleted != true AND attribute.name = '" +category +"' group by attribute.value";

            List<Object[]> as = entityManager.createNativeQuery(query).getResultList();

            filters.put(category, extractData(as));
        }
       return  filters;
    }

    public List<List<String>> extractData(List<Object[]> results){
        List<List<String>> extracted = new ArrayList<>();
        results.stream().forEach((record) -> {
            List<String> result = new ArrayList<>();

            result.add("" +  record[0].toString().trim());
            result.add("" + (BigInteger) record[1]);
            extracted.add(result);
        });
        return extracted;

    }


    public List<String> getFilterCategories() {
        return entityManager.createNativeQuery("select distinct attribute.name from attribute where attribute.name not in('Kontrole','Razno','Ostalo','Opis (Karakteristike)','EAN','Masa')").getResultList();
    }
    public Map<String,List<List<String>>> getDefaultFilters() {
        Map<String,List<List<String>>> filters = new HashMap<>();
        List<Object[]> data = entityManager.createNativeQuery("select brand, count(brand) as amount from product\n" +
                "where product.deleted != true group by brand").getResultList();
        filters.put("brand",extractData(data));
        return filters;
    }
    public BigInteger getPrice() {
        return (BigInteger) entityManager.createNativeQuery("select MAX(price) from product where product.deleted != true").getSingleResult();
    }

    public int getLastID() {
        return ((BigInteger)entityManager.createNativeQuery("select max(id_product) from product").getResultList().get(0)).intValue();
    }

    @Override
    public void changeProduct(Product product) {
         entityManager.merge(product);

    }

    @Override
    public void deleteProduct(int id) {
        entityManager.createNativeQuery("UPDATE product SET deleted = true where id_product = ?").setParameter(1,id).executeUpdate();
    }
    @Override
    public void restoreProduct(int id) {
        Product product = entityManager.find(Product.class,id);
        product.setDeleted(false);
        entityManager.persist(product);
    }
    @Override
    public List<Product> adminAllProducts() {
        return entityManager.createNativeQuery("select * from product",Product.class).getResultList();
    }

    @Override
    public List<Product> getPopularProducts() {
      return entityManager.createNativeQuery("select product.* from product where product.id_product in (select cart.id_product from cart group by cart.id_product order by sum(amount) desc) and deleted != true LIMIT 10",Product.class).getResultList();
    }
    @Override
    public List<Product> getProductsOnDiscount() {
      return entityManager.createNativeQuery("select * from product where discount > 0 and deleted != true",Product.class).getResultList();
    }
}
