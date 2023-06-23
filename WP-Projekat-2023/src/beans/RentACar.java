package beans;

import java.util.ArrayList;

import beans.Enum.GearBoxType;
import beans.Enum.RentACarStatus;

public class RentACar {
	private String id;
	private String name;
	private ArrayList<Vehicle> availableVehicles;
	private String workingHours;
	private RentACarStatus status;
	private Location location;
	private String logoPath;
	private int grade;

	

	public RentACar(String name, ArrayList<Vehicle> availableVehicles, String workingHours,
			RentACarStatus status, Location location, String logoPath, int grade) {
		super();
		this.name = name;
		this.availableVehicles = availableVehicles;
		this.workingHours = workingHours;
		this.status = status;
		this.location = location;
		this.logoPath = logoPath;
		this.grade = grade;
	}

	public RentACar(String name, String workingHours, RentACarStatus status,int grade) {
		
		this.name = name;
		this.workingHours = workingHours;
		this.status = status;
		this.grade = grade;
		
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<Vehicle> getAvailableVehicles() {
		return availableVehicles;
	}

	public void setAvailableVehicles(ArrayList<Vehicle> availableVehicles) {
		this.availableVehicles = availableVehicles;
	}

	public String getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(String workingHours) {
		this.workingHours = workingHours;
	}

	public RentACarStatus getStatus() {
		return status;
	}

	public void setStatus(String status) {
		if(status.equals("WORKING")) {
			this.status = RentACarStatus.WORKING;
		}else{
			this.status = RentACarStatus.CLOSED;
		}
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}
}
