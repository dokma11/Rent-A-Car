package dao;

import java.util.HashMap;
import java.util.Map;

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
	
	public UserDAO(String ContextPath) {
	    users = new HashMap<String, User> ();
	/*    
	    User u1 = new User("dokma11", "legenda11", "Vukasin", "Dokmanovic", "Male", LocalDate.of(2002,1,21), UserRole.BUYER);
		u1.setId("0");
		
		User u2 = new User("dokma112", "legenda112", "Vukasin2", "Dokmanovic2", "Male", LocalDate.of(2002,3,22), UserRole.BUYER);
		u2.setId("1");
		
		users.put(u1.getId(), u1);
		users.put(u2.getId(), u2);
	    */
	    System.out.println(ContextPath);
	    loadDataFromJson(ContextPath);
	}
	
	public HashMap<String, User> getAll(){
		return users;
	}
	
	public User getById(String id) {
		return users.get(id);
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

	        return toEdit;
	        
	    }

	    return null; // User with the specified ID does not exist
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
            Map<String, User> myObjectMap = gson.fromJson(reader, type);

            for (Map.Entry<String, User> entry : myObjectMap.entrySet()) {
                String key = entry.getKey();
                User value = entry.getValue();
                this.users.put(key, value);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
