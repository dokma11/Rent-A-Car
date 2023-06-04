package dao;

import java.time.LocalDate;
import java.util.HashMap;

import beans.User;
import beans.Enum.UserRole;

public class UserDAO {
	
	private HashMap<Integer, User> users;
	
	public UserDAO(String context) {
		users = new HashMap<Integer, User>();
		
		User u1 = new User("dokma11", "legenda11", "Vukasin", "Dokmanovic", "Male", LocalDate.of(2002,1,21), UserRole.BUYER);
		u1.setId(0);
		
		User u2 = new User("dokma112", "legenda112", "Vukasin2", "Dokmanovic2", "Male", LocalDate.of(2002,3,22), UserRole.BUYER);
		u2.setId(1);
		
		users.put(u1.getId(), u1);
		users.put(u2.getId(), u2);
	}
	
	public HashMap<Integer, User> getAll(){
		return users;
	}
	
	public User getById(String id) {
		int usersId = Integer.parseInt(id);
		return users.get(usersId);
	}
	
	public User edit(String id, User user) {
	    int usersId = Integer.parseInt(id);

	    if (users.containsKey(usersId)) {
	        User toEdit = users.get(usersId);

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
	            toEdit.setDateOfBirth(user.getDateOfBirth().toString());
	        }

	        return toEdit;
	    }

	    return null; // User with the specified ID does not exist
	}

	public void add(User user) {
        @SuppressWarnings("unlikely-arg-type")
        User last = users.get(users.size() - 1);
        user.setId(last.getId() + 1);
        users.put(user.getId(), user);
    }
}
