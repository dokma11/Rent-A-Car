package beans;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class ShoppingCart {
	private String id;
	private String userId;
	private ArrayList<String> idsOfVehiclesInCart;
	private int price;
	private LocalDate rentalDateStart; 
	private LocalDate rentalDateEnd;

	public ShoppingCart() {

	}
	
	public ShoppingCart(String userId, ArrayList<String> ids, int price, LocalDate rds, LocalDate rde) {
		super();
		this.userId = userId;
		this.idsOfVehiclesInCart = ids;
		this.price = price;
		this.rentalDateEnd = rde;
		this.rentalDateStart = rds;
	}

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
