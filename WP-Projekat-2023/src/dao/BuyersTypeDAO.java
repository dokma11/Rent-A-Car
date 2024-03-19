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

import beans.BuyersType;

public class BuyersTypeDAO {

	private HashMap<String, BuyersType> types;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	public BuyersTypeDAO(String ContextPath) {
	    types = new HashMap<String, BuyersType> ();
	    ctx = ContextPath;
	    loadDataFromJson(ContextPath);
	}
	
	public HashMap<String, BuyersType> getAll(){
		return types;
	}
	
	public BuyersType getSilver(){
		for(BuyersType type : types.values()) {
			if(type.getName().toString().equals("SILVER")) {
				return type;
			}
		}
		return null;
	}
	
	public BuyersType getGold(){
		for(BuyersType type : types.values()) {
			if(type.getName().toString().equals("GOLD")) {
				return type;
			}
		}
		return null;
	}
	
	public BuyersType getById(String id) {
		return types.get(id);
	}

	public void add(BuyersType type) {
		
		Integer maximum = -1;
		for (String key : types.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
        type.setId((++maximum).toString());
        types.put(type.getId(), type);
        
        saveToJson(ctx);
    }

	public void saveToJson(String contextPath) {
		String json = gson.toJson(types);

        try (FileWriter writer = new FileWriter(contextPath + "/buyerTypes.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
        try (FileReader reader = new FileReader(contextPath + "/buyerTypes.txt")) {
            Type type = new TypeToken<HashMap<String, BuyersType>>(){}.getType();
            this.types = gson.fromJson(reader, type);
            
            if (this.types == null) {
	            this.types = new HashMap<>();
	        }
        } catch (IOException e) {
        	this.types = new HashMap<>();
            e.printStackTrace();
        } 
	}
}
