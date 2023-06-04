package beans;

import beans.Enum.FuelType;
import beans.Enum.GearBoxType;
import beans.Enum.VehicleStatus;
import beans.Enum.VehicleType;

public class Vehicle {
	private int id;
	private String brand;
	private String model;
	private int price;
	private GearBoxType gearBoxType;
	private RentACar owner;//do i need a better name?
	private VehicleType vehicleType;
	private FuelType fuelType;
	private String consumption;
	private int doorsNumber;
	private int passangerCapacity;
	private String description;
	private String picturePath;//will save only the path for now
	private VehicleStatus status;
	
	public Vehicle() {

	}
	
	public Vehicle(String brand, String model, int price, GearBoxType gearBoxType, int rentACarsPosession,
			VehicleType vehicleType, FuelType fuelType, String consumption, int doorsNumber, int passangerCapacity,
			String description, String picture, VehicleStatus status) {
		super();
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.gearBoxType = gearBoxType;
		this.owner.setId(rentACarsPosession);
		this.vehicleType = vehicleType;
		this.fuelType = fuelType;
		this.consumption = consumption;
		this.doorsNumber = doorsNumber;
		this.passangerCapacity = passangerCapacity;
		this.description = description;
		this.picturePath = picture;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public void setGearBoxType(GearBoxType gearBoxType) {
		this.gearBoxType = gearBoxType;
	}

	public RentACar getRentACarsPosession() {
		return owner;
	}

	public void setRentACarsPosession(RentACar rentACarsPosession) {
		this.owner = rentACarsPosession;
	}

	public VehicleType getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(VehicleType vehicleType) {
		this.vehicleType = vehicleType;
	}

	public FuelType getFuelType() {
		return fuelType;
	}

	public void setFuelType(FuelType fuelType) {
		this.fuelType = fuelType;
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

	public int getPassangerCapacity() {
		return passangerCapacity;
	}

	public void setPassangerCapacity(int passangerCapacity) {
		this.passangerCapacity = passangerCapacity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicture() {
		return picturePath;
	}

	public void setPicture(String picture) {
		this.picturePath = picture;
	}

	public VehicleStatus getStatus() {
		return status;
	}

	public void setStatus(VehicleStatus status) {
		this.status = status;
	}	
}
