package com.kang.knu_30.controller;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.vaadin.external.jsoup.Jsoup;
import com.vaadin.external.jsoup.nodes.Document;
import com.vaadin.external.jsoup.select.Elements;
import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class TestController {

    private static PythonInterpreter interpreter;

    private static final String DEVELOPER_KEY = "YOUR_API_KEY";

    private static final String APPLICATION_NAME = "API code samples";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    @RequestMapping("/")
    public ModelAndView index() throws Exception{
        ModelAndView mav = new ModelAndView("index");

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
