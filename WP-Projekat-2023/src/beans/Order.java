package beans;

import beans.Enum.RentalStatus;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class Order {
	private String id;
	//private String uniqueId;//come back to this (do i need the regular id, maybe for json files)
	//private ArrayList<Vehicle> rentedVehicles;
	private ArrayList<String> idsOfRentedVehicles;
	//private RentACar rentACarFacility;
	private ArrayList<String> idsOfRentACarFacilities;
	private LocalDate rentalDateStart; 
	private LocalDate rentalDateEnd; //should check
	private int price;
	//private User buyer;//it says name and surname in specification only idk
	private String userId;
	private RentalStatus status;
	
	public Order() {
		
	}
	
	public Order(ArrayList<String> rentedVehicles, ArrayList<String> idsOfRentACarFacilities, LocalDate rentalDate,
			LocalDate rentalDuration, int price, String buyer, RentalStatus status) {
		super();
		//this.uniqueId = uniqueId;
		//this.rentedVehicles = rentedVehicles;
		//this.rentACarFacility = rentACarFacility;
		this.rentalDateStart = rentalDate;
		this.rentalDateEnd = rentalDuration;
		this.price = price;
		//this.buyer = buyer;
		this.status = status;
		this.userId = buyer;
		this.idsOfRentACarFacilities = idsOfRentACarFacilities;
		this.idsOfRentedVehicles = rentedVehicles;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	/*
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
	*/
	public String getRentalDateStart() {
		return rentalDateStart.toString();
	}

	public void setRentalDateStart(String RentalDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    this.rentalDateStart = LocalDate.parse(RentalDate,formatter);
	}
	
	public String getRentalDateEnd() {
		return rentalDateEnd.toString();
	}
	
	public void setRentalDateEnd(String rentalDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    this.rentalDateEnd = LocalDate.parse(rentalDate,formatter);
	}
	
	public int getPrice() {
		return price;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
/*	
	public User getBuyer() {
		return buyer;
	}
	
	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}
	*/
	public RentalStatus getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		if(status.equals("PROCESSING")) {
			this.status = RentalStatus.PROCESSING;
		}else if(status.equals("APPROVED")) {
			this.status = RentalStatus.APPROVED;
		}else if(status.equals("PICKED_UP")) {
			this.status = RentalStatus.PICKED_UP;
		}else if(status.equals("RETURNED")) {
			this.status = RentalStatus.RETURNED;
		}else if(status.equals("REJECTED")) {
			this.status = RentalStatus.REJECTED;
		}else if(status.equals("CANCELED")) {
			this.status = RentalStatus.CANCELED;
		}
	}

	public ArrayList<String> getIdsOfRentedVehicles() {
		return idsOfRentedVehicles;
	}

	public void setIdsOfRentedVehicles(ArrayList<String> idsOfRentedVehicles) {
		this.idsOfRentedVehicles = idsOfRentedVehicles;
	}

	public ArrayList<String> getIdsOfRentACarFacilities() {
		return idsOfRentACarFacilities;
	}

	public void setIdsOfRentACarFacilities(ArrayList<String> idsOfRentACarFacilities) {
		this.idsOfRentACarFacilities = idsOfRentACarFacilities;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
