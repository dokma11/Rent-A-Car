package services;

import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Vehicle;
import dao.VehicleDAO;

@Path("/vehicles")
public class VehicleService {

	public VehicleService() {

	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct 
	public void init() {
		if(ctx.getAttribute("vehicleDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("vehicleDAO", new VehicleDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String, Vehicle> getAll(){
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Vehicle getById(@PathParam("id") String id) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
		return dao.getById(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void add(Vehicle v) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
		dao.add(v);
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Vehicle editVehicle(@PathParam("id") String id, Vehicle v) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
		return dao.edit(id, v);
	}

	@GET
	@Path("/getAvailableVehicles/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Vehicle> getAvailableVehicles(@PathParam("id") String id) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
		return dao.getAvailableVehicles(id);
	}
	
	@GET
	@Path("/getVehiclesInCart/{idList}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Vehicle> getVehiclesInCart(@PathParam("idList") String idList) {
	    VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
	    return dao.getVehiclesInCart(idList);
	}
	
	@GET
	@Path("/getVehiclesForTypeSearch/{vehicleType}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String getVehiclesForTypeSearch(@PathParam("vehicleType")String vehicleType) {
	    VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
	    return dao.getVehiclesForTypeSearch(vehicleType);
	}
	
	@GET
	@Path("/getVehiclesForGearBoxTypeSearch/{gearBoxType}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String getVehiclesForGearBoxTypeSearch(@PathParam("gearBoxType") String gearBoxType) {
	    VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
	    return dao.getVehiclesForGearBoxTypeSearch(gearBoxType);
	}
	
	@GET
	@Path("/getVehiclesForFuelTypeSearch/{fuelType}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String getVehiclesForFuelTypeSearch(@PathParam("fuelType") String fuelType) {
	    VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
	    return dao.getVehiclesForFuelTypeSearch(fuelType);
	}
	
	@PUT
	@Path("/editStatusByOrder/{idList}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void editStatusByOrder(@PathParam("idList") String idList) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("vehicleDAO");
	    dao.editStatusByOrder(idList);
	}
}
