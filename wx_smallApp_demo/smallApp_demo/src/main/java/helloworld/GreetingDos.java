package helloworld;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import accessDB.Application;

@Repository
public class GreetingDos {
	
	private static final Logger log = LoggerFactory.getLogger(Application.class);
	
	@Autowired
    public JdbcTemplate jdbcTemplate;
	
	public String registryDos(String tel, String name, String pwd) {
		
		log.info("+++++++++++: insert");
		jdbcTemplate.update("INSERT INTO customers(tel, pwd, name) VALUES (?,?,?)", tel, pwd, name);
		return "success";
	}
	
	public UserDo loginDos(String tel, String pwd) {
		
		//String sql = "SELECT id, tel, pwd, name FROM customers WHERE tel = ? AND pwd = ?";
		//String sql = "select count(1) from customers";
		String sql = "SELECT id, tel, pwd, name FROM customers WHERE tel = ? and pwd= ?";
		
//	  List<UserDo> result = jdbcTemplate.query(
//                , new Object[] {tel, password},
//                (rs, rowNum) -> new UserDo(rs.getLong("id"), rs.getString("tel"), 
//                			          rs.getString("name"), rs.getString("password"))
//                
//                
//        );
//		log.info("+++++++++++++++tel: " + tel);
//		log.info("+++++++++++++++pwd: " + password);
		
		//int lineNumbers = jdbcTemplate.queryForObject(sql,Integer.class);
		//log.info("+++++++++++++++++line numbers: " + lineNumbers);
		//@SuppressWarnings("unchecked")
		UserDo result = (UserDo) jdbcTemplate.queryForObject(sql, new Object[] {tel,pwd}, new BeanPropertyRowMapper<UserDo>(UserDo.class));
		
		log.info("+++++++++++++++id: " + result.getId());
		log.info("+++++++++++++++tel: " + result.getTel());
		log.info("+++++++++++++++pwd: " + result.getPwd());
		log.info("+++++++++++++++name: " + result.getName());
		
		return result;
	}
	
}
