using OrderService.DataProvider;
using OrderService.Models;

namespace OrderService.Application
{
    public class OrderApplicationService : IOrderApplicationService
    {
        private IOrderServiceDataProvider _dataProvider;
        public OrderApplicationService(IOrderServiceDataProvider dataProvider)
        {
            this._dataProvider = dataProvider;
        }

        public bool Add(Order order)
        {
            this._dataProvider.Add(order);
            return true;
        }
    }

    
}