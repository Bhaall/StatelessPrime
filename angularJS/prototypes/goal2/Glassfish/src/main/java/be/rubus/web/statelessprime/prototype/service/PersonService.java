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
package be.rubus.web.statelessprime.prototype.service;

import be.rubus.web.statelessprime.prototype.model.Person;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Stateless
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
}
