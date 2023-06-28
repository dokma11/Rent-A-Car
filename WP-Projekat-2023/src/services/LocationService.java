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

import beans.Location;
import dao.LocationDAO;

@Path("/locations")
public class LocationService {
	
	public LocationService() {
		
	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("locationDAO") == null) {
		String contextPath = ctx.getRealPath("");
		ctx.setAttribute("locationDAO", new LocationDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String, Location> getAll(){
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Location getById(@PathParam("id") String id) {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
		return dao.getById(id);
	}
	
	@POST
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void add(Location l) {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("locationDAO");
        dao.add(l);
    }
}
