using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using BACKEND.Entities.Model.Data_Mo.DTSU666;
using BACKEND.Entities.DTO.DataDto.DTSU666;

namespace BACKEND.Interface.IData.IDTSU666
{
    public interface IDTSU666_Repository
    { 
        Task<IEnumerable<DTSU666_Model>> GetAllAsync(DTSU666_DataShapping_Dto repuestShapping, DTSU666_FillterTime_Dto filterDate);

        Task<DTSU666_Model> GetAsync(Guid id); // Lấy  dữ liệu theo id 
        Task CreateAsync(DTSU666_Model data); // Tạo ra dữ liệu trong kho dữ liệu 

        Task UpdateAsync(DTSU666_Model data);

        Task DeleteAsync(Guid id);

    }
}
