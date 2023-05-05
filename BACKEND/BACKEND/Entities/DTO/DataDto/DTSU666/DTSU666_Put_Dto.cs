using System.ComponentModel.DataAnnotations;

namespace BACKEND.Entities.DTO.DataDto.DTSU666
{
    public class DTSU666_Put_Dto
    {

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
        public double Ua { get; set; }
        public double Ub { get; set; }
        public double Uc { get; set; }

        //Dòng điện pha
        public double Ia { get; set; }
        public double Ib { get; set; }
        public double Ic { get; set; }

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
        public double Cosft { get; set; }
        public double Cosfa { get; set; }
        public double Cosfb { get; set; }
        public double Cosfc { get; set; }

        //Tần số
        public double Hz { get; set; }
    }
}
