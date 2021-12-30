package com.kang.knu_30.controller;

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

import java.util.ArrayList;
import java.util.List;

@Controller
public class TestController {

    private static PythonInterpreter interpreter;

    @RequestMapping("/")
    public ModelAndView index() throws Exception{
        ModelAndView mav = new ModelAndView("index");

        System.setProperty("python.import.site", "false");

        interpreter = new PythonInterpreter();

        interpreter.exec("import sys");
        interpreter.exec("from bs4 import BeautifulSoup");
        interpreter.exec("import requests");


        interpreter.execfile("src/main/python/test.py");



        PyFunction pyFunction = interpreter.get("testFunc", PyFunction.class);

        PyObject pyObject = pyFunction.__call__();
        System.out.println(pyObject.toString());

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
