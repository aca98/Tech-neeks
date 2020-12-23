package com.techneeks.repositories;

import com.techneeks.classes.Product;
import com.techneeks.classes.PurchasedProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class AnalyticsRepositoryImpl implements AnalyticsRepository {

    @Autowired
    EntityManager entityManager;

    @Override
    public Map<Integer,BigInteger> getAnalytics(int year) {
        List<Object[]> list = entityManager.createNativeQuery("select EXTRACT(MONTH from purchase_date) as month, sum(amount) as sold_number from cart where EXTRACT(YEAR from purchase_date) = " + year + " group by month").getResultList();
        Map<Integer,BigInteger> map = new HashMap<>();
        list.stream().forEach(o -> {
            map.put( ((Double)o[0]).intValue(),((BigDecimal)o[1]).toBigInteger());
        });
        return map;

    }

    @Override
    public Map<Integer,BigInteger> getAnalyticsForMonth(int year,int month) {
        List<Object[]> list = entityManager.createNativeQuery("select EXTRACT(DAY from purchase_date) as month, sum(amount) as sold_number from cart where EXTRACT(YEAR from purchase_date) = "+year+" and EXTRACT(MONTH from purchase_date) = "+month+" group by month").getResultList();
        Map<Integer,BigInteger> map = new HashMap<>();
        list.stream().forEach(o -> {
            map.put(((Double)o[0]).intValue(),((BigDecimal)o[1]).toBigInteger());
        });
        return map;

    }
    @Override
    public Map<Integer,BigInteger> getProductAnalytics(int year,int productId) {
        List<Object[]> list = entityManager.createNativeQuery("select EXTRACT(MONTH from purchase_date) as month, sum(amount) as sold_number from cart where EXTRACT(YEAR from purchase_date) = " + year + " and id_product = "+productId+" group by month").getResultList();
        Map<Integer,BigInteger> map = new HashMap<>();
        list.stream().forEach(o -> {
            map.put(((Double)o[0]).intValue(),((BigDecimal)o[1]).toBigInteger());
        });
        return map;

    }
    @Override
    public Map<Integer,BigInteger> getProductAnalyticsForMonth(int year,int month,int productId) {
        List<Object[]> list = entityManager.createNativeQuery("select EXTRACT(DAY FROM purchase_date) as month, sum(amount) as sold_number from cart where EXTRACT(YEAR from purchase_date) = "+year+" and EXTRACT(MONTH from purchase_date) = "+month+" and id_product = "+productId+" group by EXTRACT(DAY from purchase_date)").getResultList();
        Map<Integer,BigInteger> map = new HashMap<>();
        list.stream().forEach(o -> {
            map.put(((Double)o[0]).intValue(),((BigDecimal)o[1]).toBigInteger());
        });
        return map;

    }

    @Override
    public List<PurchasedProduct> getPurchasedProduct(Date from, Date to) {
        return null;
    }
}
