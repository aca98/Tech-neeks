package com.techneeks.techneeks;

import com.techneeks.classes.Product;
import com.techneeks.classes.ProductAttribute;
import com.techneeks.classes.User;
import com.techneeks.repositories.*;
import com.techneeks.utilities.Utilities;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.*;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.math.BigInteger;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.List;

@SpringBootTest
class TechneeksApplicationTests {

    @Autowired
    ProductRepositoryImpl productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    AnalyticsRepository analyticsRepository;


//    @Test
//    @Transactional
//    void getFilterTest() throws IOException {
//        System.out.println(productRepository.getPopularProducts());
//    }



//    @Test
//    void contextLoads() {
//        System.setProperty("webdriver.chrome.driver", "C:\\Chrome Driver\\chromedriver.exe");
//        driver.manage().window().maximize();
//        driver.get("https://gigatron.rs/tv-audio-video/slusalice/gejmerske-slusalice");
//        WebElement list = driver.findElement(By.cssSelector("#app-container > div > div:nth-child(3) > div > div:nth-child(3) > div"));
//        List<WebElement> elements = list.findElements(By.cssSelector("div.product-item-css.col.col-25.col-nl-3.col-xl-3.col-lg-4.col-md-6.col-sm-6 > div.inner"));
//        List<String> linkList = new ArrayList<String>();
//        System.out.println("Size " + elements.size());
//        for (WebElement element : elements) {
//            linkList.add(element.findElement(By.cssSelector("div.product-box-gallery > a")).getAttribute("href"));
//        }
//        for (String link : linkList) {
//            driver.get(link);
//            try {
//                Thread.sleep(2000);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            try {
//                WebElement importantAttributes = driver.findElement(By.cssSelector("#app-container > div > div > div > div > div > div > div > div.col.col-8 > div.col.col-6.col-size-product-top.sumTopWrap > ul"));
//                List<WebElement> attributes = importantAttributes.findElements(By.cssSelector("li"));
//                Map<String, ProductAttribute> attributeList = new HashMap<String, ProductAttribute>();
//                for (WebElement ele : attributes) {
//                    String attributeName = ele.findElement(By.cssSelector("span:nth-child(1)")).getText().replace(":", "");
//                    String attributeValue = ele.findElement(By.cssSelector("span:nth-child(2)")).getText();
//
//                    attributeList.put(attributeName, new ProductAttribute(attributeName, attributeValue, true));
//                }
//                WebElement table = driver.findElement(By.cssSelector("#prodSpecifications > div:nth-child(3) > div > div > table > tbody"));
//                List<WebElement> notImportantAttributes = table.findElements(By.cssSelector("tr"));
//                for (WebElement ele : notImportantAttributes) {
//                    String attributeName = ele.findElement(By.cssSelector("td:nth-child(1)")).getText();
//                    String attributeValue = ele.findElement(By.cssSelector("td:nth-child(2)")).getText();
//                    if (!attributeList.containsKey(attributeName))
//                        attributeList.put(attributeName, new ProductAttribute(attributeName, attributeValue, false));
//                    System.out.println("List: " + attributeList);
//                }
//                String productName = driver.findElement(By.cssSelector("#app-container > div > div > div > div > div > div > div > div:nth-child(1) > div.product-title > h1")).getText();
//                String brandName = productName.split(" ")[0];
//                String price = driver.findElement(By.cssSelector("#app-container > div > div > div > div > div > div > div > div.col.col-8 > div:nth-child(2) > div > div.product-main-price > div.price-holder > div > span")).getText();
//                String type = "headphones";
//                WebElement imagesElement = driver.findElement(By.cssSelector("#product-sidebar > div.thumbs > ul"));
//                List<WebElement> imagesList = imagesElement.findElements(By.cssSelector("li > a > img"));
//                int lastId = productRepository.getLastID() + 1;
//                for (int i = 0; i < imagesList.size() ; i++) {
//                    String imageName = String.format("%d-%d.png",lastId,i);
//                    System.out.println(imagesList.get(i).getAttribute("src").replace("small","large"));
//                    URL image =  new URL(imagesList.get(i).getAttribute("src").replace("small","large"));
//                    Files.write(Paths.get(Utilities.IMAGE_DIRECTORY, imageName), image.openStream().readAllBytes());
//                }
//                Product product = new Product(productName,price,imagesList.size(),type,brandName,new ArrayList<ProductAttribute>(attributeList.values()));
//                productRepository.addProduct(product);
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//
//        }
//
//
//        driver.quit();
//    }


}
