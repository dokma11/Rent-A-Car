package beans;

import beans.Enum.FuelType;
import beans.Enum.GearBoxType;
import beans.Enum.VehicleStatus;
import beans.Enum.VehicleType;

public class Vehicle {
	private String id;
	private String brand;
	private String model;
	private int price;
	private GearBoxType gearBoxType;
	private String ownerId;
	private VehicleType vehicleType;
	private FuelType fuelType;
	private String consumption;
	private int doorsNumber;
	private int passengerCapacity;
	private String description;
	private String picturePath;
	private VehicleStatus status;
	private boolean isDeleted;
	private int amount;

	public Vehicle() {

	}
	
	public Vehicle(String brand, String model, int price, GearBoxType gearBoxType, String rentACarsPosession,
			VehicleType vehicleType, FuelType fuelType, String consumption, int doorsNumber, int passangerCapacity,
			String description, String picture, VehicleStatus status) {
		super();
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.gearBoxType = gearBoxType;
		this.ownerId = rentACarsPosession;
		this.vehicleType = vehicleType;
		this.fuelType = fuelType;
		this.consumption = consumption;
		this.doorsNumber = doorsNumber;
		this.passengerCapacity = passangerCapacity;
		this.description = description;
		this.picturePath = picture;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public GearBoxType getGearBoxType() {
		return gearBoxType;
	}

	public void setGearBoxType(String gearBoxType) {
		if(gearBoxType.equals("MANUAL")) {
			this.gearBoxType = GearBoxType.MANUAL;
		}else{
			this.gearBoxType = GearBoxType.AUTOMATIC;
		}
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public VehicleType getVehicleType() {
		return vehicleType;
	}
	
	public void setVehicleType(String vehicleType) {
		if(vehicleType.equals("CAR")) {
			this.vehicleType = VehicleType.CAR;
		}else if(vehicleType.equals("VAN")) {
			this.vehicleType = VehicleType.VAN;
		}else if(vehicleType.equals("MINIBUS")) {
			this.vehicleType = VehicleType.MINIBUS;
		}else if(vehicleType.equals("RV")) {
			this.vehicleType = VehicleType.RV;
		}else {
			this.vehicleType = VehicleType.MOTORHOME;
		}
	}

	public FuelType getFuelType() {
		return fuelType;
	}

	public void setFuelType(String fuelType) {
		if(fuelType.equals("DIESEL")) {
			this.fuelType = FuelType.DIESEL;
		}else if(fuelType.equals("GASOLINE")) {
			this.fuelType = FuelType.GASOLINE;
		}else if(fuelType.equals("HYBRID")) {
			this.fuelType = FuelType.HYBRID;
		}else {
			this.fuelType = FuelType.ELECTRIC;
		}
	}

	public String getConsumption() {
		return consumption;
	}

	public void setConsumption(String consumption) {
		this.consumption = consumption;
	}

	public int getDoorsNumber() {
		return doorsNumber;
	}

	public void setDoorsNumber(int doorsNumber) {
		this.doorsNumber = doorsNumber;
	}

	public int getPassengerCapacity() {
		return passengerCapacity;
	}

	public void setPassengerCapacity(int passengerCapacity) {
		this.passengerCapacity = passengerCapacity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicturePath() {
		return picturePath;
	}

	public void setPicturePath(String picture) {
		this.picturePath = picture;
	}

	public VehicleStatus getStatus() {
		return status;
	}

	public void setStatus(String status) {
		if(status.equals("RENTED")) {
			this.status = VehicleStatus.RENTED;
		}else if(status.equals("AVAILABLE")) {
			this.status = VehicleStatus.AVAILABLE;
		}
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(boolean deleted) {
		this.isDeleted = deleted;
	}
	
	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
}
