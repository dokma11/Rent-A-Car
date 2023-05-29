package beans;

import java.util.ArrayList;

public class ShoppingCart {
	private int id;
	private User responsibleUser;
	private ArrayList<Vehicle> vehiclesInCart;
	private int price;
	
	public ShoppingCart() {

	}
	
	public ShoppingCart(User user, ArrayList<Vehicle> vehiclesInCart, int price) {
		super();
		this.responsibleUser = user;
		this.vehiclesInCart = vehiclesInCart;
		this.price = price;
	}

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

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
