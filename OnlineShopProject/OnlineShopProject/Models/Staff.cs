using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Models
{
    [Table("Staff")]
    public class Staff
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StaffID { get; set; }
        public string StaffName { get; set; }
        public string StaffStatuse { get; set; }
        public string Salary { get; set; }
        public string PermanantAddress { get; set; }
        public string PresentAddress { get; set; }
        [DataType(DataType.EmailAddress)]
        public string StaffEmail { get; set; }
        [DataType(DataType.Password)]
        public string StaffPassword { get; set; }
    }
}