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
package be.rubus.web.cdi.message.demo.model;

public class Person {
    private String firstName;
    private String lastName;

    // Required for the JSON -> Java mapping
    public Person() {
        this(null, null);
    }

    public Person(String someFirstName, String someLastName) {
        firstName = someFirstName;
        lastName = someLastName;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Person person = (Person) o;

        if (firstName != null ? !firstName.equalsIgnoreCase(person.firstName) : person.firstName != null) {
            return false;
        }
        if (lastName != null ? !lastName.equalsIgnoreCase(person.lastName) : person.lastName != null) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        int result = firstName != null ? firstName.toLowerCase().hashCode() : 0;
        result = 31 * result + (lastName != null ? lastName.toLowerCase().hashCode() : 0);
        return result;
    }
}
