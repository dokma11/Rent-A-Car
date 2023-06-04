package dao;


import java.util.HashMap;

import beans.Location;


public class LocationDAO {
	private HashMap<Integer, Location> locations;
	
	public LocationDAO(String context) {
		locations = new HashMap<Integer, Location>();
		
		Location l1 = new Location(47.34,36.75,"Barselona");
		l1.setId(0);
		
		Location l2 = new Location(44.45,56.77,"Madrid");
		l2.setId(1);
		
		locations.put(l1.getId(), l1);
		locations.put(l2.getId(), l2);
	}
	
	public HashMap<Integer, Location> getAll(){
		return locations;
	}
	
	public Location getById(String id) {
		int locaitonsId = Integer.parseInt(id);
		return locations.get(locaitonsId);
	}
}
