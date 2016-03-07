using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    [Table("Customer")]
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerMobile { get; set; }
        public string CustomerCity { get; set; }
        public string CustomerCountry { get; set; }
        [DataType(DataType.EmailAddress)]
        public string CustomerEmail { get; set; }
        [DataType(DataType.Password)]
        public string CustomerPassword { get; set; }
    }
}