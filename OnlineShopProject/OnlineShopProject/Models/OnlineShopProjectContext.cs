using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    public class OnlineShopProjectContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public OnlineShopProjectContext() : base("name=OnlineShopProjectContext")
        {
        }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.Customer> Customers { get; set; }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.DelaveryService> DelaveryServices { get; set; }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.OrderDetail> OrderDetails { get; set; }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.Staff> Staffs { get; set; }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.PaymantDetail> PaymantDetails { get; set; }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.Product> Products { get; set; }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.ProductCategory> ProductCategories { get; set; }

        public System.Data.Entity.DbSet<OnlineShopProject.Models.Supplaier> Supplaiers { get; set; }
    
    }
}
