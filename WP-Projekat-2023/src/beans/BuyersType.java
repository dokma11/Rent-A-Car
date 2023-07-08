package beans;

import beans.Enum.BuyersTypeName;

public class BuyersType {
	private String id;
	private BuyersTypeName name;
	private double sale;
	private int collectedPointsRequired;
	
	public BuyersType() {

	}

	public BuyersType(BuyersTypeName name, double sale, int collectedPointsRequired) {
		super();
		this.name = name;
		this.sale = sale;
		this.collectedPointsRequired = collectedPointsRequired;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public BuyersTypeName getName() {
		return name;
	}

	public void setName(String name) {
		if(name == "BRONZE") {
			this.name = BuyersTypeName.BRONZE;
		}
		else if(name == "SILVER") {
			this.name = BuyersTypeName.SILVER;
		}
		else if(name == "GOLD") {
			this.name = BuyersTypeName.GOLD;
		}
	}

	public double getSale() {
		return sale;
	}

	public void setSale(double sale) {
		this.sale = sale;
	}

	public int getCollectedPointsRequired() {
		return collectedPointsRequired;
	}

	public void setCollectedPointsRequired(int collectedPointsRequired) {
		this.collectedPointsRequired = collectedPointsRequired;
	}
}
