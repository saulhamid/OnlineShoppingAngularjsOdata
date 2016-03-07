using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    [Table("PaymantDetail")]
    public class PaymantDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymantDetailsID { get; set; }
        public string PayType { get; set; }
    }
}