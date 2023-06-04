package beans;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import beans.Enum.UserRole;

public class User {
	private String id;
	private String username; 
	private String password;
	private String name;
	private String surname;
	private String gender;
	private LocalDate dateOfBirth;
	private UserRole role;
	
	public User() {

	}
	
	public User(String username, String password, String name, String surname, String gender, LocalDate dateOfBirth,
			UserRole role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDateOfBirth() {
		return dateOfBirth.toString();
	}

	public void setDateOfBirth(String dateOfBirth) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    this.dateOfBirth = LocalDate.parse(dateOfBirth,formatter);
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(String role) {
		if(role.equals("BUYER")) {
			this.role = UserRole.BUYER;
		}else if(role.equals("ADMINISTRATOR")) {
			this.role = UserRole.ADMINISTRATOR;
		}else {
			this.role = UserRole.MANAGER;
		}
	}
}
