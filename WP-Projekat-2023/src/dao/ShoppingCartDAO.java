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
	
	public ShoppingCart edit(String id, ShoppingCart sc) {
		if (shoppingCarts.containsKey(id)) {
			ShoppingCart toEdit = shoppingCarts.get(id);

	        if (sc.getUserId() != null) {
	            toEdit.setUserId(sc.getUserId());
	        }

	        if (sc.getPrice() > 0) {
	            toEdit.setPrice(sc.getPrice());
	        }

	        if (sc.getIdsOfVehiclesInCart() != null) {
	            toEdit.setIdsOfVehiclesInCart(sc.getIdsOfVehiclesInCart());
	        }
	        
	        return toEdit;
	    }

	    return null;
	}
}
