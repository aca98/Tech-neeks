package com.techneeks.repositories;

import com.techneeks.classes.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional()
@Service
public interface ProductRepository {

    Product getProduct(int id);

    void changeProduct(Product product);

    List<Product> getAllProducts(String query);

    List<Product> getFilteredProducts(String filterCriteria);

    public void restoreProduct(int id);

    public List<Product> adminAllProducts();

    public List<Product> adminProductSearch(String searchQuery);
    public List<String> getFilterCategories();

    public Map<String,List<List<String>>> getDefaultFilters() ;

    public Map<String,List<List<String>>> getFilters();

    public void deleteProduct(int id);

    void addProduct(Product product);

    List<Product> ProductSearch(String searchQuery);

    int getLastID();

    List<Product> getPopularProducts();

    public List<Product> getProductsOnDiscount();

}
