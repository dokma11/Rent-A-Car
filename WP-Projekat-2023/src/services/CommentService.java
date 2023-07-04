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

import beans.Comment;
import dao.CommentDAO;

@Path("/comments")
public class CommentService {

	public CommentService() {

	}
	
	@Context
	public ServletContext ctx;
	
	@PostConstruct 
	public void init() {
		if(ctx.getAttribute("commentDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("commentDAO", new CommentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String, Comment> getAll(){
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Comment getById(@PathParam("id") String id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.getById(id);
	}
	
	@GET
	@Path("/getByRentACar/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Comment> getByRentACar(@PathParam("id") String id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.getByRentACar(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void add(Comment c) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		dao.add(c);
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Comment editComment(@PathParam("id") String id, Comment editedComment) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.edit(id, editedComment);
	}
}
