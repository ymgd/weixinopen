package helloworld;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {
	
	@Autowired
	private GreetingService greetingSerivce;

	
	 private static final String template = "Hello, %s!";
	    private final AtomicLong counter = new AtomicLong();

	    @RequestMapping("/greeting")
	    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
	        return new Greeting(counter.incrementAndGet(),
	                            String.format(template, name));
	    }
	    
	    @RequestMapping("/index")
	    public String indexReturn() {
	    	return "welcome";
	    }
	    
	    @RequestMapping(value = "/register", method = RequestMethod.GET)
	    public String registerReturn(@RequestParam("tel") String tel, @RequestParam("name") String name,
	    		@RequestParam("pwd") String pwd) {
	    	
	    	greetingSerivce.registryService(tel, name, pwd);
	    	return "success";
	    }
	    
	    
//	    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes="application/json")
	    @RequestMapping(value = "/login", method = RequestMethod.GET)
	    public UserDo login(@RequestParam("tel") String tel,
	    		@RequestParam("pwd") String pwd) {
	    	
//		    public UserDo login(@RequestBody String body) {
	    	
	    	//String tel = body.getTel();
	    	//String pwd = body.getPwd();
//	    	System.out.println("~~~~~~~~~~body: " + body);
	    	
	    	return greetingSerivce.loginService(tel, pwd);
//	    	return new UserDo();
	    }
	    
	    
}
