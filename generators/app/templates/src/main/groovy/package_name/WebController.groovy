package <%= package_name %>

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.joda.time.*

@Controller
public class WebController {

    @RequestMapping("/")
    public String root(Map<String, Object> model) {
        model.put("title", "")
        model.put("message", "Welcome to ")
        model.put("time", DateTime.now().toString())
        return "index"
    }
}
