package beans;

public class Location {
	private String id;
	private double geographicalLength;
	private double geographicalWidth;
	private String address;//keep an eye for format
	private double longitude;
	private double latitude;
	
	public Location() {
		
	}
	
	public Location(double geographicalLength, double geographicalWidth, String address, double longitude, double latitude) {
		super();
		this.geographicalLength = geographicalLength;
		this.geographicalWidth = geographicalWidth;
		this.address = address;
		this.longitude = longitude;
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
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
