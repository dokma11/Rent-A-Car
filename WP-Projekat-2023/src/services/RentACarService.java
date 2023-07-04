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
import dao.RentACarDAO;

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
	
	@GET
	@Path("/getFromOrder/{idList}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, RentACar> getFromOrder(@PathParam("idList") String idList) {
		RentACarDAO dao = (RentACarDAO) ctx.getAttribute("rentACarDAO");
	    return dao.getFromOrder(idList);
	}
}
