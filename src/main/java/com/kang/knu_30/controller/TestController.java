package com.kang.knu_30.controller;

import com.vaadin.external.jsoup.Jsoup;
import com.vaadin.external.jsoup.nodes.Document;
import com.vaadin.external.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TestController {

    @RequestMapping("/")
    public ModelAndView index() throws Exception{
        ModelAndView mav = new ModelAndView("index");

        Document doc = null;
        doc = Jsoup.connect("https://www.youtube.com/watch?v=pSI4S3iE-5k").get();
        Elements contents = doc.select(".style-scope yt-formatted-string");

        String html = doc.html();


        System.out.println(html);
        return mav;
    }

    @RequestMapping("/test")
    public ModelAndView test() throws Exception{
        ModelAndView mav = new ModelAndView("test");

        mav.addObject("name", "goddaehee");
        List<String> testList = new ArrayList<String>();
        testList.add("a");
        testList.add("b");
        mav.addObject("list", testList);

        return mav;
    }

}
