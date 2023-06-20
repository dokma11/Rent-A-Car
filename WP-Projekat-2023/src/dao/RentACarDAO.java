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

import beans.Location;

//import javax.tools.DocumentationTool.Location;

import beans.RentACar;
import beans.User;
import beans.Vehicle;
//import beans.Vehicle;
import beans.Enum.RentACarStatus;
import dao.VehicleDAO;

public class RentACarDAO {

	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	private String ctx;

	private VehicleDAO vehicleDAO;
	private LocationDAO locationDAO;
	//private HashMap<Integer, Vehicle> vehicles = vehicleDao.getAll();
	//private HashMap<Integer, Location> locations = locationDAO.getAll();
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
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
