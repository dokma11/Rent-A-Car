package beans;

import java.util.ArrayList;

public class ShoppingCart {
	private String id;
	//private User responsibleUser;
	private String userId;
	//private ArrayList<Vehicle> vehiclesInCart;
	private ArrayList<String> idsOfVehiclesInCart;
	private int price;
	
	public ShoppingCart() {

	}
	
	public ShoppingCart(/*User user, ArrayList<Vehicle> vehiclesInCart,*/ String userId, ArrayList<String> ids, int price) {
		super();
		//this.responsibleUser = user;
		//this.vehiclesInCart = vehiclesInCart;
		this.userId = userId;
		this.idsOfVehiclesInCart = ids;
		this.price = price;
	}
/*
	public User getresponsibleUser() {
		return responsibleUser;
	}

	public void setresponsibleUser(User user) {
		this.responsibleUser = user;
	}

	public ArrayList<Vehicle> getVehiclesInCart() {
		return vehiclesInCart;
	}

	public void setVehiclesInCart(ArrayList<Vehicle> vehiclesInCart) {
		this.vehiclesInCart = vehiclesInCart;
	}
*/
	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public ArrayList<String> getIdsOfVehiclesInCart() {
		return idsOfVehiclesInCart;
	}

	public void setIdsOfVehiclesInCart(ArrayList<String> idsOfVehiclesInCart) {
		this.idsOfVehiclesInCart = idsOfVehiclesInCart;
	}
}
