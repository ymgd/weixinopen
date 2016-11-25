package app.spring.configuration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

public class MvcConfigInitializer implements WebApplicationInitializer {

	@Override
	public void onStartup(ServletContext context) throws ServletException {
		
		initializeSpringConfig(context);
		
		initializeWebMvcConfig(context);
		
		initializeFilter(context);
	}

	private void initializeFilter(ServletContext context) {
		CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
		encodingFilter.setEncoding("UTF-8");
		javax.servlet.FilterRegistration.Dynamic encodingFilterDynamic = context.addFilter("encodingFilter", encodingFilter);
		encodingFilterDynamic.addMappingForUrlPatterns(null, false, "/*");
		
	}

	private void initializeWebMvcConfig(ServletContext context) {
		AnnotationConfigWebApplicationContext webApplicationContext = new AnnotationConfigWebApplicationContext();
		webApplicationContext.register(MvcConfiguration.class);
		
		Dynamic dispatcher = context.addServlet("dispatcher", new DispatcherServlet(webApplicationContext));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("/*");
		dispatcher.setAsyncSupported(true);
	}

	/**
	 * 初始化Spring配置
	 * @param context
	 */
	private void initializeSpringConfig(ServletContext context) {
		AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
		rootContext.register(RootConfiguration.class);
		context.addListener(new ContextLoaderListener(rootContext));
		
	}

}
