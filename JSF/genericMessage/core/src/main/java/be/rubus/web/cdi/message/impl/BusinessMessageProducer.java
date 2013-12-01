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

import be.rubus.web.cdi.message.BusinessMessage;
import org.apache.deltaspike.core.impl.message.MessageBundleInvocationHandler;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 *
 */
@ApplicationScoped
public class BusinessMessageProducer {
    @Produces
    @Dependent
    public <M> BusinessMessage<M> createBusinessMessage(InjectionPoint injectionPoint,
                                                        MessageBundleInvocationHandler invocationHandler) {
        if (!(injectionPoint.getType() instanceof ParameterizedType)) {
            throw new IllegalArgumentException("BusinessMessage must be used as generic type");
        }
        ParameterizedType paramType = (ParameterizedType) injectionPoint.getType();
        Type[] actualTypes = paramType.getActualTypeArguments();
        if (actualTypes.length != 1) {
            throw new IllegalArgumentException("BusinessMessage must have the MessageBundle as generic type parameter");
        }
        try {
            @SuppressWarnings("unchecked") Class<M> type = (Class<M>) actualTypes[0];
            return createBusinessMessageFor(injectionPoint, type, invocationHandler);
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Incorrect class found when trying to convert to parameterized type", e);
        }
    }

    private <M> BusinessMessage<M> createBusinessMessageFor(InjectionPoint injectionPoint, Class<M> rawType,
                                                            MessageBundleInvocationHandler invocationHandler) {
        return new DefaultBusinessMessage<M>(rawType, invocationHandler);
    }

}
