package beans;

import java.util.ArrayList;

import beans.Enum.RentACarStatus;

public class RentACar {
	private int id;
	private String name;
	private ArrayList<Vehicle> availableVehicles;
	private String workingHours; //for example(8-22)?
	private RentACarStatus status;
	private Location location;
	private String logoPath;//needs to be a picture so i thought to save only the patrh of the picture 
	private int grade;

	public RentACar() {

	}

	public RentACar(String name, ArrayList<Vehicle> availableVehicles, String workingHours,
			RentACarStatus status, Location location, String logo, int grade) {
		super();
		this.name = name;
		this.availableVehicles = availableVehicles;
		this.workingHours = workingHours;
		this.status = status;
		this.location = location;
		this.logoPath = logo;
		this.grade = grade;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public void setStatus(RentACarStatus status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogo() {
		return logoPath;
	}

	public void setLogo(String logo) {
		this.logoPath = logo;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}
}
