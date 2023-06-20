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

import beans.RentACar;
import beans.User;
import beans.Vehicle;
import beans.Enum.FuelType;
import beans.Enum.GearBoxType;

import beans.Enum.VehicleStatus;
import beans.Enum.VehicleType;

public class VehicleDAO {
	
	private HashMap<String, Vehicle> vehicles;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	public VehicleDAO(String context) {
		vehicles = new HashMap<String, Vehicle>();
		ctx = context;
	    loadDataFromJson(context);
	}
	
	public HashMap<String, Vehicle> getAll(){
		return vehicles;
	}
	
	public Vehicle getById(String id) {
		return vehicles.get(id);
	}
	
	public void add(Vehicle vehicle) {
		
		System.out.println("usao u add za vehicle konacno");
		
		Integer maximum = -1;
		for (String key : vehicles.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
        vehicle.setId((++maximum).toString());
        vehicles.put(vehicle.getId(), vehicle);
        
        saveToJson(ctx);
    }
	
	public void saveToJson(String contextPath) {
		String json = gson.toJson(vehicles);

        try (FileWriter writer = new FileWriter(contextPath + "/vehicles.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
        try (FileReader reader = new FileReader(contextPath + "/vehicles.txt")) {
            Type type = new TypeToken<HashMap<String, User>>(){}.getType();
            this.vehicles = gson.fromJson(reader, type);
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
