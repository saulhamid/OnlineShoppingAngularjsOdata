using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    [Table("OrderDetail")]
    public class OrderDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderDetailsID { get; set; }
        public string InvoiceID { get; set; }
        public string OrderItems { get; set; }
        public string OrderDate { get; set; }
        public string OrderQty { get; set; }
        public string ProductSize { get; set; }
        public string OrderAmount { get; set; }


        public int ProductID { get; set; }
        [ForeignKey("ProductID")]
        public virtual Product Products { get; set; }




        public int PaymantDetailsID { get; set; }
        [ForeignKey("PaymantDetailsID")]
        public virtual PaymantDetail PaymantDetails { get; set; }



        public int CustomerID { get; set; }
        [ForeignKey("CustomerID")]
        public virtual Customer Customers { get; set; }
    }
}