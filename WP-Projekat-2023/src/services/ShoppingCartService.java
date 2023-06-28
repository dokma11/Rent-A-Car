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

import beans.ShoppingCart;
import dao.ShoppingCartDAO;

@Path("/shoppingCarts")
public class ShoppingCartService {
	
	public ShoppingCartService() {
		
	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("shoppingCartDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("shoppingCartDAO", new ShoppingCartDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String, ShoppingCart> getAll(){
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("shoppingCartDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart getById(@PathParam("id") String id) {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("shoppingCartDAO");
		return dao.getById(id);
	}
	
	@POST
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void add(ShoppingCart s) {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("shoppingCartDAO");
        dao.add(s);
    }
}
