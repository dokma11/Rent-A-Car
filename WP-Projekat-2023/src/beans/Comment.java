package beans;

import beans.Enum.CommentStatus;

public class Comment {
	private String id;
	private User user;
	private RentACar rentACar;
	private String text;
	private int grade;//on a scale 1-5
	private CommentStatus status;
	
	public Comment() {

	}

	public Comment(User user, RentACar rentACar, String text, int grade, CommentStatus status) {
		super();
		this.user = user;
		this.rentACar = rentACar;
		this.text = text;
		this.grade = grade;
		this.status = status;
	}	

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(String status) {
		if(status.equals("PENDING")) {
			this.status = CommentStatus.PENDING;
		}else if(status.equals("ACCEPTED")){
			this.status = CommentStatus.ACCEPTED;
		}else {
			this.status = CommentStatus.DECLINED;
		}
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public RentACar getRentACar() {
		return rentACar;
	}

	public void setRentACar(RentACar rentACar) {
		this.rentACar = rentACar;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
