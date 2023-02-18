using System.ComponentModel.DataAnnotations.Schema;

namespace BACK.Models
{
    public class Subcategories
    {
        public int id { get; set; }

        public string name { get; set; }

        public int active { get; set; }

        [ForeignKey("Categories")]
        public int categoriesid { get; set; }
    }
}
