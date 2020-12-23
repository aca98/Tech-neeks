package com.techneeks.controllers;

import com.techneeks.repositories.AnalyticsRepository;
import org.apache.tomcat.jni.Time;
import org.hibernate.query.criteria.internal.expression.function.CurrentDateFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

@CrossOrigin(value = "*")
@RestController
public class AnalyticsController {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    @GetMapping("/analytics")
    public Map<Integer,BigInteger> getAnalytics(@RequestParam int year){
        Map<Integer,BigInteger> godisnje = new HashMap<>();
        Map<Integer, BigInteger> dates = analyticsRepository.getAnalytics(year);
        for (int i = 1; i <= 12; i++) {
            if(dates.containsKey(i)){
                godisnje.put(i,dates.get(i));
            }else{
                godisnje.put(i,BigInteger.ZERO);
            }
        }
        return godisnje;
    }
    @GetMapping("/product_analytics")
    public Map<Integer,BigInteger> getProductAnalytics(@RequestParam int year,@RequestParam int productId){
        Map<Integer,BigInteger> godisnje = new HashMap<>();
        Map<Integer, BigInteger> dates = analyticsRepository.getProductAnalytics(year,productId);
        for (int i = 1; i <= 12; i++) {
            if(dates.containsKey(i)){
                godisnje.put(i,dates.get(i));
            }else{
                godisnje.put(i,BigInteger.ZERO);
            }
        }
        return godisnje;
    }
    @GetMapping("/monthly_analytics")
    public Map<Integer,BigInteger> getAnalyticsMonth(@RequestParam int year,@RequestParam int month){
        Map<Integer,BigInteger> godisnje = new HashMap<>();
        Map<Integer, BigInteger> dates = analyticsRepository.getAnalyticsForMonth(year,month+1);
        Calendar cal = new GregorianCalendar();
        cal.set(Calendar.YEAR,year);
        cal.set(Calendar.MONTH,month);
        int days = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        for (int i = 1; i <= days ; i++) {
            if(dates.containsKey(i)){
                godisnje.put(i,dates.get(i));
            }else{
                godisnje.put(i,BigInteger.ZERO);
            }
        }
        return godisnje;
    }
    @GetMapping("/product_monthly_analytics")
    public Map<Integer,BigInteger> getProductAnalyticsMonth(@RequestParam int year,@RequestParam int month,@RequestParam int productId){
        Map<Integer,BigInteger> godisnje = new HashMap<>();
        Map<Integer, BigInteger> dates = analyticsRepository.getProductAnalyticsForMonth(year,month+1,productId);
        Calendar cal = new GregorianCalendar();
        cal.set(Calendar.YEAR,year);
        cal.set(Calendar.MONTH,month);
        int days = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        for (int i = 1; i <= days ; i++) {
            if(dates.containsKey(i)){
                godisnje.put(i,dates.get(i));
            }else{
                godisnje.put(i,BigInteger.ZERO);
            }
        }
        return godisnje;
    }
}
