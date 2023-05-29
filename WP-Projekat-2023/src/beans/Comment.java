package beans;

public class Comment {
	private int id;
	private User user;
	private RentACar rentACar;
	private String text;
	private int grade;//on a scale 1-5
	
	public Comment() {

	}

	public Comment(User user, RentACar rentACar, String text, int grade) {
		super();
		this.user = user;
		this.rentACar = rentACar;
		this.text = text;
		this.grade = grade;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
