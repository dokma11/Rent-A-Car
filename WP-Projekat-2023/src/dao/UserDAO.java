package dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import beans.Order;
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
import java.time.format.DateTimeFormatter;

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
	
	public HashMap<String, User> getAllManagers(){
		HashMap<String, User> ret = new HashMap<String, User>();

		for (User user : users.values()) {
			if (user.getRole().equals(UserRole.MANAGER)) {
				ret.put(user.getId(), user);   
	        }
	    }
		
		return ret;
	}
	
	public String getManagerIds(String list){
		String ret = "";
		
		List<String> idValues = Arrays.asList(list.split(","));
		ArrayList<String> ids = new ArrayList<>(idValues);		
			
		for (String id : ids) {			
			for(User user : users.values()) {
				if (user.getRole().equals(UserRole.MANAGER)) {
					if(user.getRentACarObjectId().equals(id)) {
						ret = ret.concat("," + user.getId());
					}
				}
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
	        
	        toEdit.setCollectedPointsNumber(user.getCollectedPointsNumber());
	        
	        if (user.getBuyerTypeId() != null) {
	        	toEdit.setBuyerTypeId(user.getBuyerTypeId());
	        }
	        
	        CheckIfSuspect(user.getId());
	        
	        saveToJson(ctx);
	        
	        return toEdit;
	    }

	    return null;
	}
	
	private void CheckIfSuspect(String userId) {
		HashMap<String, Order> orders = new HashMap<String, Order> ();
		
		OrderDAO oDao = new OrderDAO(ctx);
		orders = oDao.getByUserId(userId);
		
		for(Order order : orders.values()) {
			if(!order.getCancellationDate().equals("0001-01-01")) {
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");				
				LocalDate temp = LocalDate.parse(order.getCancellationDate(), formatter);
				LocalDate tempAfter = temp.plusMonths(1);
				LocalDate tempBefore = temp.minusMonths(1);

				int sameDayCounter=0;
				int beforeCounter=0;
				int afterCounter=0;
				for(Order orderToCompare : orders.values()) {					
					if(!orderToCompare.getId().equals(order.getId()) && !orderToCompare.getCancellationDate().equals("0001-01-01")) {
						LocalDate orderToComparesDate= LocalDate.parse(orderToCompare.getCancellationDate(), formatter);
						LocalDate ordersDate= LocalDate.parse(order.getCancellationDate(), formatter);
						
						if((orderToComparesDate.isAfter(ordersDate) && orderToComparesDate.isBefore(tempAfter))) {
							afterCounter++;
						} 
						else if(orderToComparesDate.isBefore(ordersDate) && orderToComparesDate.isAfter(tempBefore)){
							beforeCounter++;
						}
						else if(orderToCompare.getCancellationDate().equals(order.getCancellationDate())) {
							sameDayCounter++;
						}
					}
				}
								
				if(sameDayCounter >= 5 || beforeCounter >= 5 || afterCounter >= 5) {
					User toEdit = users.get(userId);
					toEdit.setSuspicious(true);
					return;
				}
				else {
					sameDayCounter = 0;
					beforeCounter = 0;
					afterCounter = 0;
				}
			}
		}
		return;
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
            
            if (this.users == null) {
	            this.users = new HashMap<>();
	        }
        } catch (IOException e) {
        	this.users = new HashMap<>();
            e.printStackTrace();
        } 
	}
}
