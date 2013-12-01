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
package be.rubus.web.cdi.message.impl;

import be.rubus.web.cdi.message.BusinessMessageContext;
import be.rubus.web.cdi.message.MessageSeverity;
import org.apache.deltaspike.core.api.message.Message;
import org.apache.deltaspike.core.impl.message.MessageBundleInvocationHandler;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 *
 */
public class BusinessMessageBundleInvocationHandler implements InvocationHandler {
    private final MessageSeverity severity;

    private final MessageBundleInvocationHandler invocationHandler;

    public BusinessMessageBundleInvocationHandler(MessageSeverity someSeverity,
                                                  MessageBundleInvocationHandler someHandler) {
        severity = someSeverity;
        invocationHandler = someHandler;
    }

    public Object invoke(final Object proxy, final Method method, final Object[] args) throws Throwable {
        Object message = invocationHandler.invoke(proxy, method, args);

        if (severity == null) {
            if (message instanceof Message) {
                return message;
            }

            return getMessage(message);
        } else {
            String msg = getMessage(message);
            BusinessMessageContext.getCurrentInstance().addMessage(new be.rubus.web.cdi.message.Message(severity, msg));

            return msg;
        }
    }

    private String getMessage(Object message) {
        if (message == null) {
            return null;
        }

        if (message instanceof String) {
            return (String) message;
        } else if (message instanceof Message) {
            return message.toString();
        } else {
            throw new IllegalArgumentException("message must be of either type String or Message but was: " +
                    message.getClass() + " value: " + message);
        }
    }

}
