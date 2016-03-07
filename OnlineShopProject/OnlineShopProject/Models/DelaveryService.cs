using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    [Table("DelaveryService")]
    public class DelaveryService
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DelaveryServiceID { get; set; }
        public string DelaveryDate { get; set; }

        public int StaffID { get; set; }
        [ForeignKey("StaffID")]
        public virtual Staff Staffs { get; set; }


        public int OrderDetailsID { get; set; }
        [ForeignKey("OrderDetailsID")]
        public virtual OrderDetail OrderDetails { get; set; }
    }
}