package app.spring.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan(basePackages={"app.wx.controller.vzan"})
@EnableWebMvc
public class RootConfiguration {
	

}
