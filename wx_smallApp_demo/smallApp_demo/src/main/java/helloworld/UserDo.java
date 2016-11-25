package helloworld;

public class UserDo {
    private long id;
    private String tel, name, pwd;
    
//    public UserDo() {
//    	
//    }
//    
//    
//	public UserDo(long id, String tel, String name, String password) {
//		//super();
//		this.id = id;
//		this.tel = tel;
//		this.name = name;
//		this.password = password;
//	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

}
