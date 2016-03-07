using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    [Table("Supplaier")]
    public class Supplaier
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SupID { get; set; }
        public string SupName { get; set; }
        public string SupAddress { get; set; }
        public string SupMobile { get; set; }
    }
}