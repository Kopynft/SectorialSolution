using System.ComponentModel.DataAnnotations.Schema;

namespace BACK.Models
{
    public class Topics
    {
        public int id { get; set; }

        public string name { get; set; }

        public int active { get; set; }

        [ForeignKey("Subcategory")]
        public int subcategoriesid { get; set; }
    }
}
