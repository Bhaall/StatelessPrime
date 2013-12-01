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

import be.rubus.web.cdi.message.BusinessMessageContext;
import be.rubus.web.cdi.message.Message;
import be.rubus.web.cdi.message.MessageSeverity;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.List;

@Provider
public class WrapPayloadFilter implements ContainerResponseFilter {
    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        List<Message> messages = BusinessMessageContext.getCurrentInstance().getMessages();

        Object entity = responseContext.getEntity();
        if (isPostWithBooleanResult(requestContext, entity)) {
            if (hasErrorMessages(messages)) {
                entity = Boolean.FALSE;
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        String payload = mapper.writeValueAsString(entity);

        Transfer result = new Transfer();
        result.setData(payload);

        for (Message msg : messages) {
            result.addMesssage(msg);
        }
        responseContext.setEntity(mapper.writeValueAsString(result));

        BusinessMessageContext.release();

    }

    private boolean hasErrorMessages(List<Message> someMessages) {
        boolean result = false;
        int idx = 0;
        int numberOfMessages = someMessages.size();
        Message msg;
        while (idx < numberOfMessages && !result) {
            msg = someMessages.get(idx);
            if (MessageSeverity.ERROR == msg.getSeverity() || MessageSeverity.FATAL == msg.getSeverity()) {
                result = true;
            }
            idx++;
        }
        return result;
    }

    private boolean isPostWithBooleanResult(ContainerRequestContext someRequestContext, Object someEntity) {
        boolean result = someEntity instanceof Boolean;
        if (result) {
            result = "POST".equals(someRequestContext.getMethod());
        }
        return result;
    }
}