using System;

namespace BACKEND.Entities.DTO.DataDto.DTSU666
{
    public class DTSU666_Get_Dto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        //Công suất tổng
        public double A_sum { get; set; }
        public double A_imp { get; set; }
        public double A_exp { get; set; }
        //Công suất phản kháng Q
        public double Q1 { get; set; }
        public double Q2 { get; set; }
        public double Q3 { get; set; }
        public double Q4 { get; set; }

        //Điện áp dây
        public float Uab { get; set; }
        public float Ubc { get; set; }
        public float Uca { get; set; }

        //Điện áp pha 
        public float Ua { get; set; }
        public float Ub { get; set; }
        public float Uc { get; set; }

        //Dòng điện pha
        public float Ia { get; set; }
        public float Ib { get; set; }
        public float Ic { get; set; }

        //Công suất tiêu thụ pha
        public double Pft { get; set; }
        public double Pfa { get; set; }
        public double Pfb { get; set; }
        public double Pfc { get; set; }

        //Công suất phản kháng pha
        public double Qft { get; set; }
        public double Qfa { get; set; }
        public double Qfb { get; set; }
        public double Qfc { get; set; }

        //Hệ số công suất pha
        public float Cosft { get; set; }
        public float Cosfa { get; set; }
        public float Cosfb { get; set; }
        public float Cosfc { get; set; }

        //Tần số
        public float Hz { get; set; }
        public DateTimeOffset Date { get; set; }
    }
}
