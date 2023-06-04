package dao;


import java.util.ArrayList;
import java.util.HashMap;

import beans.Location;

//import javax.tools.DocumentationTool.Location;

import beans.RentACar;
import beans.Vehicle;
//import beans.Vehicle;
import beans.Enum.RentACarStatus;
//import dao.VehicleDAO;


public class RentACarDAO {

	private VehicleDAO vehicleDAO;
	private LocationDAO locationDAO;
	//private HashMap<Integer, Vehicle> vehicles = vehicleDao.getAll();
	//private HashMap<Integer, Location> locations = locationDAO.getAll();
	private HashMap<Integer, RentACar> rentACars;
	
	public RentACarDAO(String context) {
		rentACars = new HashMap<Integer, RentACar>();
		locationDAO = new LocationDAO(context);
		
		//Location location=locations.get(0);
		Location location = locationDAO.getById("0"); 
		Location location2 = locationDAO.getById("1");
		
		
		
		RentACar r1 = new RentACar("Cap","9-12",RentACarStatus.WORKING,4);
		r1.setLocation(location);
		r1.setLogoPath("https://f8540e.p3cdn2.secureserver.net/wp-content/uploads/POV_INK_TEST_3_SMALL_2a-1.png?time=1685754095");
		r1.setId(0);
		
	
		
		
		
		RentACar r2 = new RentACar("Lol","7-14",RentACarStatus.CLOSED,7);
		
		r2.setId(1);
		r2.setLogoPath("https://okpartizan.rs/wp-content/uploads/2016/09/logo.png");
		r2.setLocation(location2);
		
	
		
		rentACars.put(r1.getId(), r1);
		rentACars.put(r2.getId(), r2);
	}
	public HashMap<Integer, RentACar> getAll(){
		return rentACars;
	}
	
	public RentACar getById(String id) {
		int rentACarId = Integer.parseInt(id);
		return rentACars.get(rentACarId);
	}
	
	public void setLocation(Location location,RentACar rentACar) {
		rentACar.setLocation(location);
	}
	
}
