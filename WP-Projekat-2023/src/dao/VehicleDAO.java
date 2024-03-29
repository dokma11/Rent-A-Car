package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Vehicle;

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
	
	public Vehicle edit(String id, Vehicle v) {
		if (vehicles.containsKey(id)) {
	        Vehicle toEdit = vehicles.get(id);

	        if (v.getBrand() != null) {
	            toEdit.setBrand(v.getBrand());
	        }

	        if (v.getModel() != null) {
	            toEdit.setModel(v.getModel());
	        }

	        if (v.getPrice() <= 0) {
	            toEdit.setPrice(v.getPrice());
	        }

	        if (v.getGearBoxType() != null) {
	            toEdit.setGearBoxType(v.getGearBoxType().toString());
	        }

	        if (v.getFuelType() != null) {
	            toEdit.setFuelType(v.getFuelType().toString());
	        }

	        if (v.getOwnerId() != null) {
	            toEdit.setOwnerId(v.getOwnerId());
	        }
	        
	        if (v.getVehicleType() != null) {
	            toEdit.setVehicleType(v.getVehicleType().toString());
	        }
	        
	        if (v.getConsumption() != null) {
	            toEdit.setConsumption(v.getConsumption());
	        }
	        
	        if (v.getDoorsNumber() <= 0) {
	            toEdit.setDoorsNumber(v.getDoorsNumber());
	        }
	        
	        if (v.getPassengerCapacity() <= 0) {
	            toEdit.setPassengerCapacity(v.getPassengerCapacity());
	        }
	        
	        if (v.getDescription() != null) {
	            toEdit.setDescription(v.getDescription());
	        }
	        
	        if (v.getPicturePath() != null) {
	            toEdit.setPicturePath(v.getPicturePath());
	        }
	        
	        if (v.getStatus() != null) {
	            toEdit.setStatus(v.getStatus().toString());
	        }
	        
	        toEdit.setIsDeleted(v.getIsDeleted());
	        
	        saveToJson(ctx);
	        
	        return toEdit;
	        
	    }

	    return null;
	}

	public HashMap<String, Vehicle> getAvailableVehicles(String rentACarsId){
		HashMap<String, Vehicle> ret = new HashMap<String, Vehicle>();
		
		for (Vehicle vehicle : vehicles.values()) {
			if (vehicle.getOwnerId().equals(rentACarsId)) {
				ret.put(vehicle.getId(), vehicle);   
	        }
	    } 

		return ret;
	}
	
	public HashMap<String, Vehicle> getVehiclesInCart(String idList) {
		HashMap<String, Vehicle> ret = new HashMap<String, Vehicle>();
		
		List<String> idValues = Arrays.asList(idList.split(","));
		ArrayList<String> ids = new ArrayList<>(idValues);		
				
		for (String id : ids) {
			for (Vehicle vehicle : vehicles.values()) {
				if (vehicle.getId().equals(id)) {
					ret.put(vehicle.getId(), vehicle);
					break;
		        }
		    }
	    } 

		return ret;
	}
	
	public String getVehiclesForTypeSearch(String list){
		String ret = "";
		
		for (Vehicle vehicle : vehicles.values()) {			
			if(list.equals(vehicle.getVehicleType().toString())) {
				if(!ret.contains(vehicle.getOwnerId())) {
					ret = ret.concat("," + vehicle.getOwnerId());
				}
			}
	    } 

		return ret;
	}
	
	public String getVehiclesForGearBoxTypeSearch(String list){
		String ret = "";
		
		for (Vehicle vehicle : vehicles.values()) {			
			if(list.equals(vehicle.getGearBoxType().toString())) {
				if(!ret.contains(vehicle.getOwnerId())) {
					ret = ret.concat("," + vehicle.getOwnerId());
				}
			}
	    } 

		return ret;
	}
	
	public String getVehiclesForFuelTypeSearch(String list){
		String ret = "";
		
		for (Vehicle vehicle : vehicles.values()) {			
			if(list.equals(vehicle.getFuelType().toString())) {
				if(!ret.contains(vehicle.getOwnerId())) {
					ret = ret.concat("," + vehicle.getOwnerId());
				}
			}
	    } 

		return ret;
	}
	
	public void editStatusByOrder(String idList) {		
		List<String> idValues = Arrays.asList(idList.split(","));
		ArrayList<String> ids = new ArrayList<>(idValues);		
				
		for (String id : ids) {
			for (Vehicle vehicle : vehicles.values()) {
				if (vehicle.getId().equals(id)) {
					
					if(vehicle.getStatus().toString() == "AVAILABLE") {
						vehicle.setStatus("RENTED");
					}else if(vehicle.getStatus().toString() == "RENTED") {
						vehicle.setStatus("AVAILABLE");
					}
					
					break;
		        }
		    }
	    } 
		
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
            Type type = new TypeToken<HashMap<String, Vehicle>>(){}.getType();
            this.vehicles = gson.fromJson(reader, type);
            
            if (this.vehicles == null) {
	            this.vehicles = new HashMap<>();
	        }
        } catch (IOException e) {
        	this.vehicles = new HashMap<>();
            e.printStackTrace();
        }  
	}
}
