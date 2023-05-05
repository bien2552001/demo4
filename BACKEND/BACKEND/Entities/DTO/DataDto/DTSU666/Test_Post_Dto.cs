using System;

namespace BACKEND.Entities.DTO.DataDto.DTSU666
{
    public class Test_Post_Dto
    {
        public string Name = "Đồng hồ Pzem017";
        //Điện áp 
        public double U1 { get; set; }
        //Dòng điện 
        public double I1 { get; set; }

        //public string Gio { get; set; }
        //public string Ngay { get; set; }
        //public string Thang { get; set; }
        //public string Nam { get; set; }

        public DateTime Timestamp = DateTime.Now;

    }
}
