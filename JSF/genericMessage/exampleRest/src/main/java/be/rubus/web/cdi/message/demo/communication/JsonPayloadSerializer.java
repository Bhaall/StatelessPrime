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

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class JsonPayloadSerializer extends StdSerializer<String> {


    protected JsonPayloadSerializer() {
        super(String.class);
    }

    public JsonPayloadSerializer(Class<?> someClass, boolean b) {
        super(someClass, b);
    }

    public JsonPayloadSerializer(Class<String> someJsonPayloadClass) {
        super(someJsonPayloadClass);
    }

    public JsonPayloadSerializer(JavaType someJavaType) {
        super(someJavaType);
    }


    public void serialize(JsonPayload payload, JsonGenerator someJsonGenerator, SerializerProvider someSerializerProvider) throws IOException, JsonGenerationException {
        //someJsonGenerator.writeBinary(mapper.writeValueAsString(o).getBytes());
        someJsonGenerator.writeRawValue(payload.getPayload());
    }

    public void serialize(String payload, JsonGenerator someJsonGenerator, SerializerProvider someSerializerProvider) throws IOException, JsonGenerationException {
        //someJsonGenerator.writeBinary(mapper.writeValueAsString(o).getBytes());
        System.out.println("How do we get here ?"+payload);
        someJsonGenerator.writeRawValue(payload);
    }

}
