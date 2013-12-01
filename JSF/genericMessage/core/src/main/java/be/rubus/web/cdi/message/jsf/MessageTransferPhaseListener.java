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
package be.rubus.web.cdi.message.jsf;

import be.rubus.web.cdi.message.BusinessMessageContext;
import be.rubus.web.cdi.message.Message;
import be.rubus.web.cdi.message.MessageSeverity;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import java.util.List;

/**
 *
 */
public class MessageTransferPhaseListener implements PhaseListener {
    @Override
    public void afterPhase(PhaseEvent somePhaseEvent) {

    }

    @Override
    public void beforePhase(PhaseEvent somePhaseEvent) {
        List<Message> messages = BusinessMessageContext.getCurrentInstance().getMessages();
        FacesContext facesContext = somePhaseEvent.getFacesContext();
        for (Message msg : messages) {
            facesContext.addMessage(null, new FacesMessage(convertSeverity(msg.getSeverity()), msg.getText(), msg
                    .getText()));
        }

        BusinessMessageContext.release();
    }

    private FacesMessage.Severity convertSeverity(MessageSeverity someSeverity) {
        FacesMessage.Severity result = FacesMessage.SEVERITY_INFO;
        switch (someSeverity) {

            case INFO:
                result = FacesMessage.SEVERITY_INFO;
                break;
            case WARN:
                result = FacesMessage.SEVERITY_WARN;
                break;
            case ERROR:
                result = FacesMessage.SEVERITY_ERROR;
                break;
            case FATAL:
                result = FacesMessage.SEVERITY_FATAL;
                break;
        }

        return result;
    }

    @Override
    public PhaseId getPhaseId() {
        return PhaseId.RENDER_RESPONSE;
    }
}
