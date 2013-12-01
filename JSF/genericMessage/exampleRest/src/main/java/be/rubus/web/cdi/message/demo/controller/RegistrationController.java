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
package be.rubus.web.cdi.message.demo.controller;

import be.rubus.web.cdi.message.demo.model.Person;
import be.rubus.web.cdi.message.demo.service.AttendeeService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("registration")
public class RegistrationController {

    @Inject
    private AttendeeService attendeeService;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/all")
    public List<Person> getList() {
        return attendeeService.getAllAttendees();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/add")
    public boolean addPerson(Person person) {
        attendeeService.addPerson(person);
        return true;
    }

}
