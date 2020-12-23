package com.techneeks.repositories;

import com.techneeks.classes.PurchasedProduct;

import java.math.BigInteger;
import java.sql.Date;
import java.util.List;
import java.util.Map;

public interface AnalyticsRepository {

    public Map<Integer, BigInteger> getAnalytics(int year);
    public Map<Integer,BigInteger> getAnalyticsForMonth(int year,int month);
    public Map<Integer,BigInteger> getProductAnalytics(int year,int productId);
    public Map<Integer,BigInteger> getProductAnalyticsForMonth(int year,int month,int productId);
    public List<PurchasedProduct> getPurchasedProduct(Date from, Date to);
}
