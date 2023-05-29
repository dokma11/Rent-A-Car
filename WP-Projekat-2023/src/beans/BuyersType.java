package beans;

import beans.Enum.BuyersTypeName;

public class BuyersType {
	private int id;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BuyersTypeName getName() {
		return name;
	}

	public void setName(BuyersTypeName name) {
		this.name = name;
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
