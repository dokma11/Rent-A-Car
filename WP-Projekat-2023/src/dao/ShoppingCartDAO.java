package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.ShoppingCart;
import beans.User;

public class ShoppingCartDAO {
	
	private HashMap<String, ShoppingCart> shoppingCarts;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	public ShoppingCartDAO(String ContextPath) {
		shoppingCarts = new HashMap<String, ShoppingCart> ();
	    ctx = ContextPath;
	    loadDataFromJson(ContextPath);
	}
	
	public HashMap<String, ShoppingCart> getAll(){
		return shoppingCarts;
	}
	
	public ShoppingCart getById(String id) {
		return shoppingCarts.get(id);
	}
	
	public void add(ShoppingCart shoppingCart) {
		
		Integer maximum = -1;
		for (String key : shoppingCarts.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
		shoppingCart.setId((++maximum).toString());
		shoppingCarts.put(shoppingCart.getId(), shoppingCart);
        
        saveToJson(ctx);
    }
	
	public void saveToJson(String contextPath) {
		String json = gson.toJson(shoppingCarts);

        try (FileWriter writer = new FileWriter(contextPath + "/shoppingCarts.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
        try (FileReader reader = new FileReader(contextPath + "/shoppingCarts.txt")) {
            Type type = new TypeToken<HashMap<String, User>>(){}.getType();
            this.shoppingCarts = gson.fromJson(reader, type);
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
