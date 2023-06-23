package beans;

public class Location {
	private String id;
	private double geographicalLength;
	private double geographicalWidth;
	private String address;//keep an eye for format
	
	public Location() {
		
	}
	
	public Location(double geographicalLength, double geographicalWidth, String address) {
		super();
		this.geographicalLength = geographicalLength;
		this.geographicalWidth = geographicalWidth;
		this.address = address;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public double getGeographicalLength() {
		return geographicalLength;
	}

	public void setGeographicalLength(double geographicalLength) {
		this.geographicalLength = geographicalLength;
	}

	public double getGeographicalWidth() {
		return geographicalWidth;
	}

	public void setGeographicalWidth(double geographicalWidth) {
		this.geographicalWidth = geographicalWidth;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
