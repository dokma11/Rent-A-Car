package dao;

import java.util.HashMap;

import beans.User;
import beans.Enum.UserRole;

public class UserDAO {
	
	private HashMap<Integer, User> users;
	
	public UserDAO(String context) {
		users = new HashMap<Integer, User>();
		
		User u1 = new User("dokma11", "legenda11", "Vukasin", "Dokmanovic", "Male", "11-02-2002", UserRole.BUYER);
		u1.setId(0);
		User u2 = new User("dokma112", "legenda112", "Vukasin2", "Dokmanovic2", "Male", "11-02-2002", UserRole.BUYER);
		u2.setId(1);
		
		users.put(u1.getId(), u1);
		users.put(u2.getId(), u2);
	}
	
	public HashMap<Integer, User> getAll(){
		return users;
	}
	
	public User getById(String id) {
		int i = Integer.parseInt(id);
		return users.get(i);
	}
	
	public void edit(String id, User user) {
		int i = Integer.parseInt(id);
		User toEdit = users.get(i);
		
		toEdit.setUsername(user.getUsername());
		toEdit.setPassword(user.getPassword());
		toEdit.setName(user.getName());
		toEdit.setSurname(user.getSurname());
		toEdit.setGender(user.getGender());
		toEdit.setDateOfBirth(user.getDateOfBirth());
		toEdit.setRole(user.getRole());
	}
}
