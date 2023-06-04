package services;

import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACar;
import beans.User;
import dao.RentACarDAO;
import dao.UserDAO;
import dao.VehicleDAO;

@Path("/rentACars")
public class RentACarService {

	public RentACarService() {
		
	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct 
	public void init() {
		if(ctx.getAttribute("rentACarDAO") == null) {
		String contextPath = ctx.getRealPath("");
		ctx.setAttribute("rentACarDAO", new RentACarDAO(contextPath));
		}
		/*if(ctx.getAttribute("vehicleDAO") == null) {
			String contextPath=ctx.getRealPath("");
			ctx.setAttribute("vehicleDAO", new VehicleDAO(contextPath));
		}*/
	}
	
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<Integer, RentACar> getAll(){
		RentACarDAO dao = (RentACarDAO) ctx.getAttribute("rentACarDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RentACar getById(@PathParam("id") String id) {
		RentACarDAO dao = (RentACarDAO) ctx.getAttribute("rentACarDAO");
		return dao.getById(id);
	}
	
	
}
