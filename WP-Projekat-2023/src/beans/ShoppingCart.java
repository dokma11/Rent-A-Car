package beans;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class ShoppingCart {
	private String id;
	//private User responsibleUser;
	private String userId;
	//private ArrayList<Vehicle> vehiclesInCart;
	private ArrayList<String> idsOfVehiclesInCart;
	private int price;
	private LocalDate rentalDateStart; 
	private LocalDate rentalDateEnd;

	public ShoppingCart() {

	}
	
	public ShoppingCart(/*User user, ArrayList<Vehicle> vehiclesInCart,*/ String userId, ArrayList<String> ids, int price, LocalDate rds, LocalDate rde) {
		super();
		//this.responsibleUser = user;
		//this.vehiclesInCart = vehiclesInCart;
		this.userId = userId;
		this.idsOfVehiclesInCart = ids;
		this.price = price;
		this.rentalDateEnd = rde;
		this.rentalDateStart = rds;
	}
/*
	public User getresponsibleUser() {
		return responsibleUser;
	}

	public void setresponsibleUser(User user) {
		this.responsibleUser = user;
	}

	public ArrayList<Vehicle> getVehiclesInCart() {
		return vehiclesInCart;
	}

	public void setVehiclesInCart(ArrayList<Vehicle> vehiclesInCart) {
		this.vehiclesInCart = vehiclesInCart;
	}
*/
	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public ArrayList<String> getIdsOfVehiclesInCart() {
		return idsOfVehiclesInCart;
	}

	public void setIdsOfVehiclesInCart(ArrayList<String> idsOfVehiclesInCart) {
		this.idsOfVehiclesInCart = idsOfVehiclesInCart;
	}
	
	public String getRentalDateStart() {
		return rentalDateStart.toString();
	}

	public void setRentalDateStart(String rentalDateStart) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		this.rentalDateStart = LocalDate.parse(rentalDateStart,formatter);;
	}

	public String getRentalDateEnd() {
		return rentalDateEnd.toString();
	}

	public void setRentalDateEnd(String rentalDateEnd) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		this.rentalDateEnd = LocalDate.parse(rentalDateEnd,formatter);
	}
}
