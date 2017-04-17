using DockerRegistration.Messaging;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DockerRegistration.Registration.Notification
{
    public class OrderRegisteredConsumer : IConsumer<IOrderRegisteredEvent>
    {
        public async Task Consume(ConsumeContext<IOrderRegisteredEvent> context)
        {
            //Send notification to user
            await Console.Out.WriteLineAsync($"Customer notification sent: Order id {context.Message.CorrelationId}");
        }
    }
}
