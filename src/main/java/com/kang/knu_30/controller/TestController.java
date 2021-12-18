package com.kang.knu_30.controller;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
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
