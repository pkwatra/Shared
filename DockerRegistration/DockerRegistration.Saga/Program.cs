
using System;
using DockerRegistration.Messaging;
using MassTransit.Saga;
using Automatonymous;
using MassTransit;

namespace DockerRegistration.Saga
{
    class Program
    {
        static void Main(string[] args)
        {
            //Console.Title = "Saga";
            //var saga = new OrderSaga();

            //var repo = new InMemorySagaRepository<OrderSagaState>();

            //var bus = BusConfigurator.ConfigureBus((cfg, host) =>
            //{
            //    cfg.ReceiveEndpoint(host, RabbitMqConstants.SagaQueue, e =>
            //    {
            //        e.StateMachineSaga(saga, repo);
            //    });
            //});
            //bus.Start();
            //Console.WriteLine("Saga active.. Press enter to exit");
            //Console.ReadLine();
            //bus.Stop();
        }
    }
}
