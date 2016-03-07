using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    [Table("Product")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string UnitPrice { get; set; }
        public string Description { get; set; }
        public string ProductQty { get; set; }
        public string Image { get; set; }

        public int CategoryID { get; set; }
        [ForeignKey("CategoryID")]
        public virtual ProductCategory ProductCategories { get; set; }

        public int SupID { get; set; }
        [ForeignKey("SupID")]
        public virtual Supplaier Supplaiers { get; set; }
    }
}