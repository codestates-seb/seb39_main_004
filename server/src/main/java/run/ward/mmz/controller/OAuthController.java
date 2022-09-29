package run.ward.mmz.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.SessionAccount;

import javax.servlet.http.HttpSession;
import java.util.Date;

@RequiredArgsConstructor
@Controller
public class OAuthController {

    private final HttpSession httpSession;



    @GetMapping("/login2")
    public String index(Model model) {
        Account sessionAccount = (Account) httpSession.getAttribute("account");

        if (sessionAccount != null) {
            model.addAttribute("name", sessionAccount.getName());
            model.addAttribute("picture", sessionAccount.getPicture());
        }

        return "success";
    }

    @GetMapping("/user")
    public String success(){
        return "success";
    }



    @GetMapping("/logo")
    public String success2(){
        return "my_page";
    }

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

    @GetMapping("/hello2")
    public String hello2(){
        return "hello2";
    }

    @GetMapping("/hello3")
    public String hello3(){

        return "hello3";
    }


}
