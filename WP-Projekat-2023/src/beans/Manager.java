package beans;

public class Manager extends User {
	private String rentACarObject;

	public Manager() {

	}
	
	public Manager(String rentACarObject) {
		super();
		this.rentACarObject = rentACarObject;
	}

	public String getRentACarObject() {
		return rentACarObject;
	}

	public void setRentACarObject(String rentACarObject) {
		this.rentACarObject = rentACarObject;
	}	
}
