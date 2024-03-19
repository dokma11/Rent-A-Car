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

import beans.BuyersType;
import dao.BuyersTypeDAO;

@Path("/buyerTypes")
public class BuyersTypeService {
	
	public BuyersTypeService() {
		
	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("buyersTypeDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("buyersTypeDAO", new BuyersTypeDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String, BuyersType> getAll(){
		BuyersTypeDAO dao = (BuyersTypeDAO) ctx.getAttribute("buyersTypeDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public BuyersType getById(@PathParam("id") String id) {
		BuyersTypeDAO dao = (BuyersTypeDAO) ctx.getAttribute("buyersTypeDAO");
		return dao.getById(id);
	}
	
	@GET
	@Path("/getSilver")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public BuyersType getSilver() {
		BuyersTypeDAO dao = (BuyersTypeDAO) ctx.getAttribute("buyersTypeDAO");
		return dao.getSilver();
	}
	
	@GET
	@Path("/getGold")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public BuyersType getGold() {
		BuyersTypeDAO dao = (BuyersTypeDAO) ctx.getAttribute("buyersTypeDAO");
		return dao.getGold();
	}
	
	@POST
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void add(BuyersType bt) {
		BuyersTypeDAO dao = (BuyersTypeDAO) ctx.getAttribute("buyersTypeDAO");
        dao.add(bt);
    }
}
