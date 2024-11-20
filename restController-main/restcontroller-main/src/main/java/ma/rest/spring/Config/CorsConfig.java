package ma.rest.spring.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Autoriser toutes les routes
                        .allowedOrigins("http://localhost:3000") // Autoriser les requêtes depuis le frontend React
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Autoriser certaines méthodes HTTP
                        .allowedHeaders("*"); // Autoriser tous les en-têtes
            }
        };

    }
}

