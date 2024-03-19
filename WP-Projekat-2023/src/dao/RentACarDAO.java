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

import beans.Location;

import beans.RentACar;

public class RentACarDAO {

	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	private String ctx;

	private HashMap<String, RentACar> rentACars;
	
	public RentACarDAO(String context) {
		rentACars = new HashMap<String, RentACar>();
	    ctx = context;
	    loadDataFromJson(context);
	}
	
	public HashMap<String, RentACar> getAll(){
		return rentACars;
	}
	
	public RentACar getById(String id) {
		return rentACars.get(id);
	}
	
	public void setLocation(Location location,RentACar rentACar) {
		rentACar.setLocation(location);
	}
	
	public void add(RentACar rentACar) {
		
		Integer maximum = -1;
		for (String key : rentACars.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
		rentACar.setId((++maximum).toString());
        rentACars.put(rentACar.getId(), rentACar);
        
        saveToJson(ctx);
    }

	public HashMap<String, RentACar> getFromOrder(String idList) {
		HashMap<String, RentACar> ret = new HashMap<String, RentACar>();
		
		List<String> idValues = Arrays.asList(idList.split(","));
		ArrayList<String> ids = new ArrayList<>(idValues);		
				
		for (String id : ids) {
			for (RentACar rentACar : rentACars.values()) {
				if (rentACar.getId().equals(id)) {
					ret.put(rentACar.getId(), rentACar);
					break;
		        }
		    }
	    } 

		return ret;
	}
	
	public RentACar edit(String id, RentACar rentACar) {

	    if (rentACars.containsKey(id)) {
	    	RentACar toEdit = rentACars.get(id);

	        if (rentACar.getGrade() > 0 && rentACar.getGrade() < 6) {
	            toEdit.setGrade(rentACar.getGrade());
	        }
	        
	        saveToJson(ctx);
	        
	        return toEdit;
	    }

	    return null;
	}
	
	public void saveToJson(String contextPath) {
		String json = gson.toJson(rentACars);

        try (FileWriter writer = new FileWriter(contextPath + "/rentACars.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
        try (FileReader reader = new FileReader(contextPath + "/rentACars.txt")) {
            Type type = new TypeToken<HashMap<String, RentACar>>(){}.getType();
            this.rentACars = gson.fromJson(reader, type);
            
            if (this.rentACars == null) {
	            this.rentACars = new HashMap<>();
	        }
        } catch (IOException e) {
        	this.rentACars = new HashMap<>();
            e.printStackTrace();
        } 
	}
}
