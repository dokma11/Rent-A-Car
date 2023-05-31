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

import beans.User;
import dao.UserDAO;

@Path("/users")
public class UserService {
	
	public UserService() {
		
	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("userDAO") == null) {
		String contextPath = ctx.getRealPath("");
		ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}
	
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<Integer, User> getAll(){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User getById(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getById(id);
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User editUser(@PathParam("id") String id, User editedUser) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.edit(id, editedUser);
	}

}
