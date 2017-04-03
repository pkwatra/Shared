using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderService.Models
{
    public class Order
    {
    
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id {get; set;}
        public int Product {get; set;}

        public int Customer {get; set;}

        public int Quantity {get; set;}
    }
}