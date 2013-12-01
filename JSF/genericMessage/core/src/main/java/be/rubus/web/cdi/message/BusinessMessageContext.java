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
package be.rubus.web.cdi.message;

import javax.enterprise.inject.Typed;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@Typed
public final class BusinessMessageContext {

    private List<Message> messages = new ArrayList<Message>();

    private BusinessMessageContext() {
    }

    private static ThreadLocal<BusinessMessageContext> currentInstance = new ThreadLocal<BusinessMessageContext>() {
        @Override
        protected BusinessMessageContext initialValue() {
            return new BusinessMessageContext();
        }
    };

    public void addMessage(Message message) {
        messages.add(message);
    }

    public List<Message> getMessages() {
        return messages;
    }

    public static BusinessMessageContext getCurrentInstance() {
        return currentInstance.get();
    }

    public static void release() {
        currentInstance.remove();
    }

}
