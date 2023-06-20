package services;

import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACar;
import dao.LocationDAO;
import dao.RentACarDAO;
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
		
		/*
		if(ctx.getAttribute("vehicleDAO") == null) {
			String contextPath=ctx.getRealPath("");
			ctx.setAttribute("vehicleDAO", new VehicleDAO(contextPath));
		}
		
		if(ctx.getAttribute("loactionDAO") == null) {
			String contextPath=ctx.getRealPath("");
			ctx.setAttribute("locationDAO", new LocationDAO(contextPath));
		} */
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String, RentACar> getAll(){
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
	
	@POST
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void add(RentACar r) {
        RentACarDAO dao = (RentACarDAO) ctx.getAttribute("rentACarDAO");
        dao.add(r);
    }
}
