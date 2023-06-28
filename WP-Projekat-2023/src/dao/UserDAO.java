package dao;

import java.util.HashMap;

import beans.User;
import beans.Enum.UserRole;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.io.FileWriter;
import java.io.IOException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.time.LocalDate;

public class UserDAO {
	
	private HashMap<String, User> users;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	public UserDAO(String ContextPath) {
	    users = new HashMap<String, User> ();
	    ctx = ContextPath;
	    loadDataFromJson(ContextPath);
	}
	
	public HashMap<String, User> getAll(){
		return users;
	}
	
	public User getById(String id) {
		return users.get(id);
	}
	
	public HashMap<String, User> getAvailableManagers(){
		HashMap<String, User> ret = new HashMap<String, User>();

		for (User user : users.values()) {
			if (user.getRole().equals(UserRole.MANAGER) && user.getRentACarObjectId() == null) {
				ret.put(user.getId(), user);   
	        }
	    }
		
		return ret;
	}
	
	public User edit(String id, User user) {

	    if (users.containsKey(id)) {
	        User toEdit = users.get(id);

	        if (user.getUsername() != null) {
	            toEdit.setUsername(user.getUsername());
	        }

	        if (user.getPassword() != null) {
	            toEdit.setPassword(user.getPassword());
	        }

	        if (user.getName() != null) {
	            toEdit.setName(user.getName());
	        }

	        if (user.getSurname() != null) {
	            toEdit.setSurname(user.getSurname());
	        }

	        if (user.getGender() != null) {
	            toEdit.setGender(user.getGender());
	        }

	        if (user.getDateOfBirth() != null) {
	            toEdit.setDateOfBirth(user.getDateOfBirth());
	        }
	        
	        toEdit.setBlocked(user.isBlocked());
	        
	        if (user.getRentACarObjectId() != null) {
	            toEdit.setRentACarObjectId(user.getRentACarObjectId());
	        }
	        
	        saveToJson(ctx);
	        
	        return toEdit;
	    }

	    return null;
	}
	
	public void add(User user) {
		
		Integer maximum = -1;
		for (String key : users.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
        user.setId((++maximum).toString());
        user.setBlocked(false);
        user.setSuspicious(false);
        user.setCollectedPointsNumber(0);
        users.put(user.getId(), user);
        
        saveToJson(ctx);
    }
	
	public User logIn(String username, String password) {
	    for (User user : users.values()) {
	        if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
	            return user;
	        }
	    }
	    return null;
	}

	public void saveToJson(String contextPath) {
		String json = gson.toJson(users);

        try (FileWriter writer = new FileWriter(contextPath + "/users.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
        try (FileReader reader = new FileReader(contextPath + "/users.txt")) {
            Type type = new TypeToken<HashMap<String, User>>(){}.getType();
            this.users = gson.fromJson(reader, type);
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
