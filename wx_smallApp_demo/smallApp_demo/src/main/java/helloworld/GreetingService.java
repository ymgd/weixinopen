package helloworld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GreetingService {
	
	@Autowired
	private GreetingDos greetingDos;
	
	public String registryService(String tel, String name, String pwd) {
		
		greetingDos.registryDos(tel, name, pwd);
		return "success";
	}
	
	public UserDo loginService(String tel, String pwd) {
		
		return greetingDos.loginDos(tel, pwd);
	}
	
	
}
