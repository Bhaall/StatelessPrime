package be.rubus.web.cdi.message.impl;

import be.rubus.web.cdi.message.BusinessMessage;
import be.rubus.web.cdi.message.MessageSeverity;
import org.apache.deltaspike.core.api.message.MessageBundle;
import org.apache.deltaspike.core.impl.message.MessageBundleInvocationHandler;
import org.apache.deltaspike.core.util.ClassUtils;

import java.lang.reflect.Proxy;

/**
 *
 */
public class DefaultBusinessMessage<T> implements BusinessMessage<T> {

    private final Class<T> type;

    private final MessageBundleInvocationHandler invocationHandler;

    public DefaultBusinessMessage(Class<T> someType, MessageBundleInvocationHandler someInvocationHandler) {
        type = someType;
        invocationHandler = someInvocationHandler;

        if (!type.isInterface() || type.getAnnotation(MessageBundle.class) == null) {
            throw new IllegalArgumentException(
                    "BusinessMessage must only be used for interfaces " + "annotated with @MessageBundle!");
        }
    }

    @Override
    public T failing() {
        return getMessage(MessageSeverity.ERROR);
    }

    @Override
    public T warning() {
        return getMessage(MessageSeverity.WARN);
    }

    @Override
    public T information() {
        return getMessage(MessageSeverity.INFO);
    }

    private T getMessage(MessageSeverity severity) {
        return type.cast(Proxy.newProxyInstance(ClassUtils
                .getClassLoader(null), new Class<?>[]{type}, new BusinessMessageBundleInvocationHandler(severity,
                invocationHandler)));
    }
}
