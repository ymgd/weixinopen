package app.wx.controller.vzan;

import java.io.IOException;
import java.io.Serializable;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.lang.UsesSunHttpServer;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/minisnsapp")
public class VzanAPIController {

	
	/**
	 * 微信登陆
	 */
	@RequestMapping()
	@ResponseBody
	public Object getByWx() {
		Object object = new Object();
		return object;
	}
	/**
	 * 获取列表信息
	 */
	@RequestMapping(value = "/getartlistbyminisnsid", consumes="application/json",
			method = RequestMethod.POST, produces = {"text/html; charset=utf-8"})
	@ResponseBody
	public Object getArticles(@RequestBody GetArticlesArgs args, HttpServletResponse resposne) {
		
		if (args.getPageIndex() == null)
			args.setPageIndex(1);
		if (args.getCategoryId() == null)
			args.setCategoryId(223738);
		if (args.getFid() == null)
			args.setFid(3);
		if (args.getHotshow() == null)
			args.setHotshow(1);
		String result = "";
		URIBuilder uriBuilder = new URIBuilder().setCharset(Charset.forName("UTF-8"))
				.setScheme("http").setHost("apptest.vzan.com").setPort(80);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		uriBuilder.setPath("/minisnsapp/getartlistbyminisnsid");
		uriBuilder.addParameter("deviceType", "ios9.0");
		uriBuilder.addParameter("versionCode", "1.0");
		uriBuilder.addParameter("timestamp", "1479174892808");
		uriBuilder.addParameter("sign", "817AF07823E5CF86031A8A34FB593D1EC12A5499D66EBA10E7C4B6D034EF1C67A9C8FE9FF2A33F82");
		uriBuilder.addParameter("uid", "oW2wBwUJF_7pvDFSPwKfSWzFbc5o");
		uriBuilder.addParameter("fid", args.getFid().toString());
		uriBuilder.addParameter("hotshow", args.getHotshow().toString());
		uriBuilder.addParameter("categoryId", args.getCategoryId().toString());
		uriBuilder.addParameter("pageIndex", args.getPageIndex().toString());
//		uriBuilder.setPath("/minisnsapp/getartlistbyminisnsid");
//		uriBuilder.addParameter("deviceType", deviceType);
//		uriBuilder.addParameter("versionCode", versionCode);
//		uriBuilder.addParameter("timestamp", timestamp.toString());
//		uriBuilder.addParameter("sign", sign);
//		uriBuilder.addParameter("uid", uid);
//		uriBuilder.addParameter("fid", fid.toString());
//		uriBuilder.addParameter("hotshow", hotshow.toString());
//		uriBuilder.addParameter("categoryId", categoryId.toString());
//		uriBuilder.addParameter("pageIndex", pageIndex.toString());
		
		try {
			HttpPost post = new HttpPost(uriBuilder.build());
			post.setHeader("Content-Type","multipart/form-data;charset=utf-8");
			CloseableHttpResponse response = httpClient.execute(post);
			
			HttpEntity entity = response.getEntity();
			
			result = EntityUtils.toString(entity);
			
		} catch (URISyntaxException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/getminisnsheadinfo", method = RequestMethod.POST, produces="application/json; charset=utf-8")
	@ResponseBody
	public Object headInfo(Integer id){
		if (id == null) {
			id = 3;
		}
		String result = "";

		URIBuilder uriBuilder = new URIBuilder().setCharset(Charset.forName("UTF-8"))
				.setScheme("http").setHost("apptest.vzan.com").setPort(80);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		uriBuilder.setPath("/minisnsapp/getminisnsheadinfo");
		uriBuilder.addParameter("deviceType", "ios9.0");
		uriBuilder.addParameter("versionCode", "1.0");
		uriBuilder.addParameter("timestamp", "1479174892808");
		uriBuilder.addParameter("sign", "817AF07823E5CF86031A8A34FB593D1EC12A5499D66EBA10E7C4B6D034EF1C67A9C8FE9FF2A33F82");
		uriBuilder.addParameter("uid", "oW2wBwUJF_7pvDFSPwKfSWzFbc5o");
		uriBuilder.addParameter("id", id.toString());
		
		try {
			HttpPost post = new HttpPost(uriBuilder.build());
			post.setHeader("Content-Type","multipart/form-data;charset=utf-8");
			CloseableHttpResponse response = httpClient.execute(post);
			
			HttpEntity entity = response.getEntity();
			
			result = EntityUtils.toString(entity);
		} catch (ParseException | URISyntaxException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
		
	}
	public static void main(String[] args) {
		VzanAPIController controller = new VzanAPIController();
		Object articles = controller.headInfo(null);
		System.out.println(articles);
	}
	
	
	static class BaseArgs implements Serializable{

		private static final long serialVersionUID = 1859440052950556202L;
		
		String deviceType; 
		String versionCode; 
		Long timestamp; 
		String sign; 
		String uid;
		public String getDeviceType() {
			return deviceType;
		}
		public void setDeviceType(String deviceType) {
			this.deviceType = deviceType;
		}
		public String getVersionCode() {
			return versionCode;
		}
		public void setVersionCode(String versionCode) {
			this.versionCode = versionCode;
		}
		public Long getTimestamp() {
			return timestamp;
		}
		public void setTimestamp(Long timestamp) {
			this.timestamp = timestamp;
		}
		public String getSign() {
			return sign;
		}
		public void setSign(String sign) {
			this.sign = sign;
		}
		public String getUid() {
			return uid;
		}
		public void setUid(String uid) {
			this.uid = uid;
		} 
	}
	
	
	static class GetArticlesArgs extends BaseArgs{
		
		private static final long serialVersionUID = 1702853854703604522L;
		Integer fid;
		Integer hotshow;
		Integer categoryId;
		Integer pageIndex;
		public Integer getFid() {
			return fid;
		}
		public void setFid(Integer fid) {
			this.fid = fid;
		}
		public Integer getHotshow() {
			return hotshow;
		}
		public void setHotshow(Integer hotshow) {
			this.hotshow = hotshow;
		}
		public Integer getCategoryId() {
			return categoryId;
		}
		public void setCategoryId(Integer categoryId) {
			this.categoryId = categoryId;
		}
		public Integer getPageIndex() {
			return pageIndex;
		}
		public void setPageIndex(Integer pageIndex) {
			this.pageIndex = pageIndex;
		}
		
	}
	
	
}
