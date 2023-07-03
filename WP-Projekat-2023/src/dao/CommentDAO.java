package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Comment;

public class CommentDAO {

	private HashMap<String, Comment> comments;
	
	private Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	
	private String ctx;
	
	public CommentDAO(String context) {
		comments = new HashMap<String, Comment>();
		ctx = context;
	    loadDataFromJson(context);
	}
	
	public HashMap<String, Comment> getAll(){
		return comments;
	}
	
	public Comment getById(String id) {
		return comments.get(id);
	}
	
	public void add(Comment comment) {
				
		Integer maximum = -1;
		for (String key : comments.keySet()) {
			int temp = Integer.parseInt(key);
			if(maximum < temp) {
				maximum = temp;
			}
		}
				
		comment.setId((++maximum).toString());
		comments.put(comment.getId(), comment);
                
        saveToJson(ctx);
    }
	
	public Comment edit(String id, Comment comment) {

	    if (comments.containsKey(id)) {
	    	Comment toEdit = comments.get(id);

	        if (comment.getUserId() != null) {
	            toEdit.setUserId(comment.getUserId());
	        }

	        if (comment.getRentACarId() != null) {
	            toEdit.setRentACarId(comment.getRentACarId());
	        }

	        if (comment.getText() != null) {
	            toEdit.setText(comment.getText());
	        }

	        if (comment.getGrade() >= 1 && comment.getGrade() <= 5) {
	            toEdit.setGrade(comment.getGrade());
	        }
	        
	        if (comment.getStatus() != null) {
	            toEdit.setStatus(comment.getStatus().toString());
	        }
	        
	        saveToJson(ctx);
	        
	        return toEdit;
	    }

	    return null;
	}
	
	public void saveToJson(String contextPath) {
		String json = gson.toJson(comments);

        try (FileWriter writer = new FileWriter(contextPath + "/comments.txt")) {
            writer.write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	  
	private void loadDataFromJson(String contextPath) {
        try (FileReader reader = new FileReader(contextPath + "/comments.txt")) {
            Type type = new TypeToken<HashMap<String, Comment>>(){}.getType();
            this.comments = gson.fromJson(reader, type);
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
