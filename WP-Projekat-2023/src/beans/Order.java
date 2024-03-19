package beans;

import beans.Enum.RentalStatus;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class Order {
	private String id;
	//private String uniqueId;//come back to this (do i need the regular id, maybe for json files)
	private ArrayList<String> idsOfRentedVehicles;
	private ArrayList<String> idsOfRentACarFacilities;	
	private ArrayList<String> idsOfManagersToAccept;	
	private LocalDate rentalDateStart; 
	private LocalDate rentalDateEnd;
	private int price;
	private String userId;
	private RentalStatus status;
	private LocalDate cancellationDate;
	private String refusalExplanation;
	
	public Order() {
		this.idsOfRentACarFacilities = new ArrayList<String>();
		this.idsOfRentedVehicles = new ArrayList<String>();
	}
	
	public Order(ArrayList<String> rentedVehicles, ArrayList<String> idsOfRentACarFacilities, LocalDate rentalDate,
			LocalDate rentalDuration, int price, String buyer, RentalStatus status, LocalDate cancel, String re) {
		super();
		this.rentalDateStart = rentalDate;
		this.rentalDateEnd = rentalDuration;
		this.price = price;
		this.status = status;
		this.idsOfRentACarFacilities = new ArrayList<String>();
		this.idsOfRentACarFacilities = idsOfRentACarFacilities;
		this.idsOfRentedVehicles = new ArrayList<String>();
		this.idsOfRentedVehicles = rentedVehicles;
		this.cancellationDate = cancel;
		this.refusalExplanation = re;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getRentalDateStart() {
		return rentalDateStart.toString();
	}

	public void setRentalDateStart(String rentalDateStart) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    this.rentalDateStart = LocalDate.parse(rentalDateStart,formatter);
	}
	
	public String getRentalDateEnd() {
		return rentalDateEnd.toString();
	}
	
	public void setRentalDateEnd(String rentalDateEnd) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    this.rentalDateEnd = LocalDate.parse(rentalDateEnd,formatter);
	}
	
	public int getPrice() {
		return price;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
	
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

	public void setIdsOfManagersToAccept(ArrayList<String> idsOfManagersToAccept) {
		this.idsOfManagersToAccept = idsOfManagersToAccept;
	}

	public ArrayList<String> getIdsOfManagersToAccept() {
		return idsOfManagersToAccept;
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
	
	public String getCancellationDate() {
		return cancellationDate.toString();
	}

	public void setCancellationDate(String cancellationDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    this.cancellationDate = LocalDate.parse(cancellationDate,formatter);
	}

	public String getRefusalExplanation() {
		return refusalExplanation;
	}

	public void setRefusalExplanation(String refusalExplanation) {
		this.refusalExplanation = refusalExplanation;
	}
}
