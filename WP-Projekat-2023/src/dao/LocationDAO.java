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

import beans.Location;

public class LocationDAO {
	
	private HashMap<String, Location> locations;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	public LocationDAO(String context) {
		locations = new HashMap<String, Location>();
		ctx = context;
	    loadDataFromJson(context);
	}
	
	public HashMap<String, Location> getAll(){
		return locations;
	}
	
	public Location getById(String id) {
		return locations.get(id);
	}
	
	public void add(Location location) {
		
		Integer maximum = -1;
		for (String key : locations.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
		location.setId((++maximum).toString());
		locations.put(location.getId(), location);
        
        saveToJson(ctx);
    }
	
	public void saveToJson(String contextPath) {
		String json = gson.toJson(locations);

        try (FileWriter writer = new FileWriter(contextPath + "/locations.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
        try (FileReader reader = new FileReader(contextPath + "/locations.txt")) {
            Type type = new TypeToken<HashMap<String, Location>>(){}.getType();
            this.locations = gson.fromJson(reader, type);
            
            if (this.locations == null) {
	            this.locations = new HashMap<>();
	        }
        } catch (IOException e) {
        	this.locations = new HashMap<>();
            e.printStackTrace();
        } 
	}
}
