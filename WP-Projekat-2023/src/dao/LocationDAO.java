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
import beans.User;

public class LocationDAO {
	
	private HashMap<String, Location> locations;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	public LocationDAO(String context) {
		locations = new HashMap<String, Location>();
		
		Location l1 = new Location(47.34,36.75,"Barselona");
		l1.setId("0");
		
		Location l2 = new Location(44.45,56.77,"Madrid");
		l2.setId("1");
		
		locations.put(l1.getId(), l1);
		locations.put(l2.getId(), l2);
		
		ctx = context;
		saveToJson(ctx);
	    //loadDataFromJson(context);
	}
	
	public HashMap<String, Location> getAll(){
		return locations;
	}
	
	public Location getById(String id) {
		int locaitonsId = Integer.parseInt(id);
		return locations.get(locaitonsId);
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
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
