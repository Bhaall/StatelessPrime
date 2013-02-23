/**
 * 	Licensed to the Apache Software Foundation (ASF) under one or more
 * 	contributor license agreements. See the NOTICE file distributed with
 * 	this work for additional information regarding copyright ownership.
 * 	The ASF licenses this file to You under the Apache License, Version
 * 	2.0 (the "License"); you may not use this file except in compliance
 * 	with the License. You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0 Unless required by
 * 	applicable law or agreed to in writing, software distributed under the
 * 	License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * 	CONDITIONS OF ANY KIND, either express or implied. See the License for
 * 	the specific language governing permissions and limitations under the
 * 	License.
 */
package be.rubus.statelessprime.example.view;

import be.rubus.statelessprime.example.model.Person;
import be.rubus.statelessprime.example.service.PersonService;
import org.primefaces.context.RequestContext;

import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 *
 */

@Named
@ViewScoped
public class PersonView implements Serializable {

    @Inject
    private PersonService personService;

    private Person selectedPerson ;

    public List<Person> getPersonList() {
        return personService.getPersonList();
    }

    public void selectPerson(ActionEvent actionEvent) {
        Map<String, String> parameterMap = FacesContext.getCurrentInstance().getExternalContext()
                .getRequestParameterMap();
        long selectedId = Long.valueOf(parameterMap.get("selectedPersonId"));
        selectedPerson = personService.getPersonById(selectedId);
    }

    public Person getSelectedPerson() {
        return selectedPerson;
    }

    public void setSelectedPerson(Person someSelectedPerson) {
        selectedPerson = someSelectedPerson;
    }

    public void updatePerson() {
        personService.updatePerson(selectedPerson);
        selectedPerson = null;
        RequestContext requestContext = RequestContext.getCurrentInstance();
        requestContext.execute("updatePersonList()");
    }
}
