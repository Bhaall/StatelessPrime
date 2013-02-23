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
package be.rubus.statelessprime.example.config;

import be.rubus.statelessprime.example.model.Person;

import javax.ws.rs.ext.ContextResolver;
import javax.xml.bind.JAXBContext;

// When you like to run it on Glassfish 3.1.x, uncomment following lines
//import com.sun.jersey.api.json.JSONConfiguration;
//import com.sun.jersey.api.json.JSONJAXBContext;

//@Provider
public class JSONContextResolver implements ContextResolver<JAXBContext> {

    private JAXBContext context;

    private Class[] types = {Person.class};

    public JSONContextResolver() throws Exception {
        //this.context = new JSONJAXBContext(JSONConfiguration.natural().build(), types);
    }

    public JAXBContext getContext(Class<?> objectType) {
        for (Class type : types) {
            if (type == objectType) {
                return context;
            }
        }
        return null;
    }
}
