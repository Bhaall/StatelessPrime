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
package be.rubus.web.cdi.message.demo.communication;

import be.rubus.web.cdi.message.Message;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.ArrayList;
import java.util.List;

public class Transfer {
    //private Session session;
    @JsonSerialize(using = JsonPayloadSerializer.class)
    private JsonPayload data = new JsonPayload();
    private List<Message> messages = new ArrayList<Message>();

    /*
    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
    */
    public String getData() {
        return data.getPayload();
    }

    public void setData(String data) {
        this.data.setPayload(data);
    }

    public List<?> getMessages() {
        return messages;
    }

    public void addMesssage(Message message) {
        messages.add(message);
    }
}