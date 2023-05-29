package beans;

public class Buyer extends User {
	private String allRentals; //should probably be of arrayList
	private String shoppingCart;
	private int collectedPointsNumber;
	private BuyersType buyerType;
	
	public Buyer() {

	}
	
	public Buyer(String allRentals, String shoppingCart, int collectedPointsNumber, BuyersType buyerType) {
		super();
		this.allRentals = allRentals;
		this.shoppingCart = shoppingCart;
		this.collectedPointsNumber = collectedPointsNumber;
		this.buyerType = buyerType;
	}
	
	public String getAllRentals() {
		return allRentals;
	}
	
	public void setAllRentals(String allRentals) {
		this.allRentals = allRentals;
	}
	
	public String getShoppingCart() {
		return shoppingCart;
	}
	
	public void setShoppingCart(String shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
	
	public int getCollectedPointsNumber() {
		return collectedPointsNumber;
	}
	
	public void setCollectedPointsNumber(int collectedPointsNumber) {
		this.collectedPointsNumber = collectedPointsNumber;
	}
	
	public BuyersType getBuyerType() {
		return buyerType;
	}
	
	public void setBuyerType(BuyersType buyerType) {
		this.buyerType = buyerType;
	}
}
