package be.rubus.web.statelessprime.prototype.model;

/**
 *
 */

public class Person {

	private long id;
    private String firstName;
    private String lastName;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String someFirstName) {
        firstName = someFirstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String someLastName) {
        lastName = someLastName;
    }
}
