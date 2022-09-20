package run.ward.mmz.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import run.ward.mmz.dto.SessionAccount;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class OAuthController {

    private final HttpSession httpSession;



    @GetMapping("/")
    public String index(Model model)
    {
        SessionAccount sessionAccount =(SessionAccount) httpSession.getAttribute("account");

        return null;
    }

    @GetMapping("/success")
    public String success(){
        return "success";
    }

}
