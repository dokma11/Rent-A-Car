package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Order;
import beans.RentACar;
import beans.User;
import beans.Vehicle;
import beans.Enum.FuelType;
import beans.Enum.GearBoxType;
import beans.Enum.RentalStatus;
import beans.Enum.VehicleStatus;
import beans.Enum.VehicleType;

public class OrderDAO {
	
	private HashMap<String, Order> orders;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	private ArrayList<Vehicle> vehicles;
	
	public OrderDAO(String ContextPath) {
	    orders = new HashMap<String, Order> ();
	    
	    vehicles = new ArrayList<Vehicle>();
	    
	    Vehicle v = new Vehicle("brend", "model", 123, GearBoxType.AUTOMATIC, "1", VehicleType.CAR, FuelType.DIESEL, "consumption", 4, 5, "description", "picture", VehicleStatus.AVAILABLE);
	    v.setId("0");
	    vehicles.add(v);
	    
	    RentACarDAO rDAO = new RentACarDAO(ContextPath);
	    RentACar rent = rDAO.getById("0");
	    
	    UserDAO uDAO = new UserDAO(ContextPath);
	    User user = uDAO.getById("0");
	    
	    Order o1 = new Order("ABCD", vehicles, rent, LocalDate.of(2023, 6, 19), 2, 10, user, RentalStatus.PROCESSING);
	    o1.setId("0");
	    orders.put(o1.getId(), o1);
	    
	    ctx = ContextPath;
	    saveToJson(ctx);
	    //loadDataFromJson(ContextPath);
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
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
