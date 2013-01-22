package be.rubus.web.statelessprime.prototype.service;

import be.rubus.web.statelessprime.prototype.model.Person;

import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 */
@ApplicationScoped
public class PersonService {

	private List<Person> persons = new ArrayList<Person>();

	private long id;

	public List<Person> loadAllPersons() {
		return persons;
	}

	public Person addPerson(final Person person) {
		person.setId(id++);
		persons.add(person);
		return person;
	}

	public void removePerson(final long personId) {
		Iterator<Person> iterator = persons.iterator();
		Person current;
		while (iterator.hasNext()) {
			current = iterator.next();
			if (personId == current.getId()) {
				iterator.remove();
				break;
			}
		}
	}

    public Person getById(long personId) {
        Person result = null;
        Iterator<Person> iterator = persons.iterator();
        Person current;
        while (iterator.hasNext()) {
            current = iterator.next();
            if (personId == current.getId()) {
                result = current;
                break;
            }
        }
        return result;
    }
}
