package beans;

import beans.Enum.CommentStatus;

public class Comment {
	private String id;
	private String userId;
	private String rentACarId;
	private String text;
	private int grade;//on a scale 1-5
	private CommentStatus status;
	
	public Comment() {

	}

	public Comment(User user, RentACar rentACar, String text, int grade, CommentStatus status) {
		super();
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

	public String getText() {
		return text;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRentACarId() {
		return rentACarId;
	}

	public void setRentACarId(String rentACarId) {
		this.rentACarId = rentACarId;
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
