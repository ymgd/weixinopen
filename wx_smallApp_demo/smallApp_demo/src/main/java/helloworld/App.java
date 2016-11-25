package helloworld;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.jdbc.core.JdbcTemplate;



@SpringBootApplication

//可执行war包
//public class App extends SpringBootServletInitializer implements CommandLineRunner{
public class App implements CommandLineRunner{	
	
	
//	@Override //可执行war包
//	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//	return application.sources(App.class);
//	}
	
	
	
	private static final Logger log = LoggerFactory.getLogger(App.class);
	@Autowired
    JdbcTemplate jdbcTemplate;
	
	
	public void run(String... arg0) throws Exception {
		// TODO Auto-generated method stub
	     log.info("Creating tables");

	     jdbcTemplate.execute("DROP TABLE customers IF EXISTS");
	     jdbcTemplate.execute("CREATE TABLE customers(" +
	                "id SERIAL, tel VARCHAR(255), pwd VARCHAR(255), name VARCHAR(255))");
	}
	
	
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}


}
