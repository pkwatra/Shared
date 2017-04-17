using System;

namespace DockerRegistration.Messaging
{
    public interface IOrderRegisteredEvent
    {
        Guid CorrelationId { get; }
    }
}
