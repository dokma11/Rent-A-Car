package dao;

import java.util.HashMap;


import beans.Vehicle;
import beans.Enum.FuelType;
import beans.Enum.GearBoxType;

import beans.Enum.VehicleStatus;
import beans.Enum.VehicleType;

public class VehicleDAO {
	private HashMap<Integer, Vehicle> vehicles;
	public VehicleDAO(String context) {
		vehicles = new HashMap<Integer, Vehicle>();
		
		Vehicle v1 = new Vehicle("Mercedes","c200",400,GearBoxType.MANUAL,1,VehicleType.CAR,FuelType.DIESEL,"nzm",4,5,"lol","cap",VehicleStatus.AVAILABLE);
		v1.setId(0);
		
		Vehicle v2 = new Vehicle("Cap","7-14",300,GearBoxType.AUTOMATIC,1,VehicleType.MINIBUS,FuelType.HYBRID,"k",3,5,"m","l",VehicleStatus.RENTED);
		v2.setId(1);
		
		vehicles.put(v1.getId(), v1);
		vehicles.put(v2.getId(), v2);
	}
	public HashMap<Integer, Vehicle> getAll(){
		return vehicles;
	}
	
	public Vehicle getById(String id) {
		int VehicleId = Integer.parseInt(id);
		return vehicles.get(VehicleId);
	}
}
