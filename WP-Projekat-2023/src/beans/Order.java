package beans;

import beans.Enum.RentalStatus;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class Order {
	private String id;
	private String uniqueId;//come back to this (do i need the regular id, maybe for json files)
	private ArrayList<Vehicle> rentedVehicles;
	private RentACar rentACarFacility;
	private LocalDate rentalDate; 
	private int rentalDuration; //should check
	private int price;
	private User buyer;//it says name and surname in specification only idk
	private RentalStatus status;
	
	public Order() {
		
	}
	
	public Order(String uniqueId, ArrayList<Vehicle> rentedVehicles, RentACar rentACarFacility, LocalDate rentalDate,
			int rentalDuration, int price, User buyer, RentalStatus status) {
		super();
		this.uniqueId = uniqueId;
		this.rentedVehicles = rentedVehicles;
		this.rentACarFacility = rentACarFacility;
		this.rentalDate = rentalDate;
		this.rentalDuration = rentalDuration;
		this.price = price;
		this.buyer = buyer;
		this.status = status;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getUniqueId() {
		return uniqueId;
	}
	
	public void setUniqueId(String uniqueId) {
		this.uniqueId = uniqueId;
	}
	
	public ArrayList<Vehicle> getRentedVehicles() {
		return rentedVehicles;
	}
	
	public void setRentedVehicles(ArrayList<Vehicle> rentedVehicles) {
		this.rentedVehicles = rentedVehicles;
	}
	
	public RentACar getRentACarFacility() {
		return rentACarFacility;
	}
	
	public void setRentACarFacility(RentACar rentACarFacility) {
		this.rentACarFacility = rentACarFacility;
	}
	
	public String getRentalDate() {
		return rentalDate.toString();
	}

	public void setRentalDate(String RentalDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    this.rentalDate = LocalDate.parse(RentalDate,formatter);
	}
	
	public int getRentalDuration() {
		return rentalDuration;
	}
	
	public void setRentalDuration(int rentalDuration) {
		this.rentalDuration = rentalDuration;
	}
	
	public int getPrice() {
		return price;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
	
	public User getBuyer() {
		return buyer;
	}
	
	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}
	
	public RentalStatus getStatus() {
		return status;
	}
	
	public void setStatus(RentalStatus status) {
		this.status = status;
	}
}
