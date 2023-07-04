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

import beans.Order;

public class OrderDAO {
	
	private HashMap<String, Order> orders;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
		
	public OrderDAO(String ContextPath) {
	    orders = new HashMap<String, Order> ();
	    ctx = ContextPath;
	    loadDataFromJson(ContextPath);
	}
	
	public HashMap<String, Order> getAll(){
		return orders;
	}
	
	public Order getById(String id) {
		return orders.get(id);
	}
	
	public void add(Order order) {

		Integer maximum = -1;
		for (String key : orders.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
		order.setId((++maximum).toString());
		orders.put(order.getId(), order);
        
        saveToJson(ctx);
    }
	
	public HashMap<String, Order> getByUserId(String id) {
		HashMap<String, Order> ret = new HashMap<String, Order>();
		for(Order order : orders.values()) {
			if(order.getUserId().equals(id)) {
				ret.put(order.getId(), order);
			}
		}
		
		return ret;
	}
	
	public void saveToJson(String contextPath) {
		String json = gson.toJson(orders);

        try (FileWriter writer = new FileWriter(contextPath + "/orders.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
	    try (FileReader reader = new FileReader(contextPath + "/orders.txt")) {
	        Type type = new TypeToken<HashMap<String, Order>>(){}.getType();
	        this.orders = gson.fromJson(reader, type);
	        
	        if (this.orders == null) {
	            this.orders = new HashMap<>();
	        }
	    } catch (IOException e) {
	        this.orders = new HashMap<>();
	        e.printStackTrace();
	    } 
	}

}
