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

import beans.Order;
import dao.OrderDAO;

@Path("/orders")
public class OrderService {
	
	public OrderService() {
		
	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("orderDAO") == null) {
		String contextPath = ctx.getRealPath("");
		ctx.setAttribute("orderDAO", new OrderDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String, Order> getAll(){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orderDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Order getById(@PathParam("id") String id) {
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orderDAO");
		return dao.getById(id);
	}
	
	@POST
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void add(Order o) {
        OrderDAO dao = (OrderDAO) ctx.getAttribute("orderDAO");
        dao.add(o);
    }
}