/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package be.rubus.web.cdi.message.demo.view;

import be.rubus.web.cdi.message.demo.model.Person;
import be.rubus.web.cdi.message.demo.service.AttendeeService;

import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

@Named
@ViewScoped
public class RegistrationView {

    @Inject
    private AttendeeService attendeeService;

    private String firstName;

    private String lastName;

    private boolean addPanelVisible = false;

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


    public List<Person> getAllPersons() {
        return attendeeService.getAllAttendees();
    }

    public boolean isAddPanelVisible() {
        return addPanelVisible;
    }

    public void addPerson() {
        attendeeService.addPerson(new Person(firstName, lastName));
        addPanelVisible = false;
    }

    public void setAddPanelVisible() {
        firstName = null;
        lastName = null;
        addPanelVisible = true;
    }
}
