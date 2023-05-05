using System;

namespace BACKEND.Entities.DTO.DataDto.PZEM017
{
    public class PZEM017_Put_Dto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float U1 { get; set; }
        public double I1 { get; set; }
        public double P1 { get; set; }
        public double A1 { get; set; }

        public DateTimeOffset Date1 { get; set; }
    }
}
