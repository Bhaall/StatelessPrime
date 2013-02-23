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
package be.rubus.statelessprime.example.service;

import be.rubus.statelessprime.example.model.Person;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@ApplicationScoped
public class PersonService {
    private List<Person> personList;

    @PostConstruct
    public void init() {
        personList = new ArrayList<Person>();
        personList.add(createPerson(1L, "Rudy", "De Busscher"));
        personList.add(createPerson(2L, "Çağatay", "Çivici"));
        personList.add(createPerson(3L, "Miško", "Hevery"));
    }

    private Person createPerson(long someId, String someFirstName, String someLastName) {
        Person person = new Person();
        person.setId(someId);
        person.setFirstName(someFirstName);
        person.setLastName(someLastName);
        return person;
    }

    public List<Person> getPersonList() {
        return personList;
    }

    public Person getPersonById(long id) {
        Person result = null;
        for (Person person : personList) {
            if (id == person.getId()) {
                result = person;
                break;
            }
        }
        return result;
    }

    public void updatePerson(Person person) {
        Person selectedPerson = getPersonById(person.getId());
        selectedPerson.setFirstName(person.getFirstName());
        selectedPerson.setLastName(person.getLastName());
    }
}
