package be.rubus.web.statelessprime.prototype.view;

import be.rubus.web.statelessprime.prototype.model.Person;
import be.rubus.web.statelessprime.prototype.service.PersonService;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

/**
 *
 */
@Named
@RequestScoped
public class PersonView {


    private Person person;

    @Inject
    private PersonService personService;

    @PostConstruct
    public void init() {
        person = new Person();
    }

    public List<Person> getList() {
        return personService.loadAllPersons();
    }

    public void save(ActionEvent actionEvent) {
        personService.addPerson(person);
        person = new Person();
    }

    public void deleteById(Long id) {
        Person byId = personService.getById(id);
        personService.removePerson(id);
        String personName = byId.getFirstName() + " " + byId.getLastName();
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "Removed",
                personName));
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person somePerson) {
        person = somePerson;
    }
}
