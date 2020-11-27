package com.example.demo.controller;

import com.example.demo.Bean.BrrowBook;
import com.example.demo.Bean.BrrowMan;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class TestController {
    @PostMapping("/Tologin")
    public String getname(){
        return "后端跨域发送数据!";
    }

    @PostMapping("/getTable")
    public List getInfo(){
      List<String> list=new ArrayList();
      list.add("2020-11-1");
      list.add("图书馆数据");
      return list;
    }
    @GetMapping("/getBook")
  public Map getbook(){
      BrrowMan brrowMan=new BrrowMan();
      brrowMan.setId(1);
      brrowMan.setBookname("西游记");
      brrowMan.setDate("2020-11-3");
      Map<Integer,Object>map=new HashMap<>();
      map.put(0,brrowMan);
      return map;
    }
    @GetMapping("/getBook2")
  public List getBook2(){
      List<BrrowBook> list=new ArrayList();
      Date date1=new Date();
      SimpleDateFormat bartDateFormat = new SimpleDateFormat("EEEE-MMMM-dd-yyyy");
      String date=bartDateFormat.format(date1);
      BrrowBook brrowBook1=new BrrowBook();
      brrowBook1.setBookname("Java从入门到放弃");
      brrowBook1.setDate1(date);
      brrowBook1.setDay(0);
      brrowBook1.setDate2(date);
      int i=0;
     for(;i<100;i++){
       list.add(brrowBook1);
     }
      return list;
    }
  @PostMapping(value = "/cform")
  public void login(@RequestParam Map<String,Object> reqMap, Model model) {
    String username=reqMap.get("formInline:name").toString();
    System.out.println(username);

  }


@RequestMapping(value = "/getID",method = RequestMethod. POST )
  public String get(@RequestParam(value = "id") String id){
  System.out.println(id);
        return id;
    }


  @RequestMapping(value = "/user/{username}")
  public String userProfile(@PathVariable(value="username") Integer username) {
    return "user"+username;
  }

  @RequestMapping(value = "/getmsg",method = RequestMethod. POST )
  public String getmsg(@RequestParam(value = "name") String name,@RequestParam(value = "sex") String sex,@RequestParam(value = "borrowID") String borrowID,
                       @RequestParam(value = "email") String email,@RequestParam(value = "age") String age,@RequestParam(value = "birth") String birth,
                       @RequestParam(value = "tel") String tel,@RequestParam(value = "name") String address,@RequestParam(value = "desc") String desc){
    System.out.println(name+""+sex+email+age+address);
    return name;
  }

  @RequestMapping(value = "/checkbook",method = RequestMethod.POST)
  public Integer getpass(@RequestParam(value = "id")Integer id){
    System.out.println(id);
    Integer uid=id;
    return uid;
  }
  @PostMapping(value = "/login")
  public String getLogin(@RequestParam(value = "user_name") String user_name,@RequestParam(value = "user_password") Integer user_password ){
      String name="Tom";
      Integer pwd=123;
      if (user_name==name&&pwd==user_password)
        return "go";
      else
        return null;
  }
}
