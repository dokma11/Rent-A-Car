package dao;

import java.util.HashMap;

import beans.ShoppingCart;

public class ShoppingCartDAO {
	
	private HashMap<String, ShoppingCart> shoppingCarts;
		
	public ShoppingCartDAO(String ContextPath) {
		shoppingCarts = new HashMap<String, ShoppingCart> ();
	}
	
	public HashMap<String, ShoppingCart> getAll(){
		return shoppingCarts;
	}
	
	public ShoppingCart getById(String id) {
		return shoppingCarts.get(id);
	}
	
	public void add(ShoppingCart shoppingCart) {
		
		Integer maximum = -1;
		for (String key : shoppingCarts.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
		shoppingCart.setId((++maximum).toString());
		shoppingCarts.put(shoppingCart.getId(), shoppingCart);
    }
}
