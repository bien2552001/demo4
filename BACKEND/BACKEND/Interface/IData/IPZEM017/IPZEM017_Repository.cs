using BACKEND.Entities.DTO.DataDto.DTSU666;
using BACKEND.Entities.Model.Data_Mo.DTSU666;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using BACKEND.Entities.Model.Data_Mo.PZEM017;
using BACKEND.Entities.DTO.DataDto.PZEM017;
using BACKEND.Controllers.Data_Co;

namespace BACKEND.Interface.IData.IPZEM017
{
    public interface IPZEM017_Repository
    {
        //GET
        Task<IEnumerable<PZEM017_Model>> GetAllPzem017Async(PZEM017_DataShapping_Dto repuestShapping, PZEM017_FillterTime_Dto fillter);

        //GET ID
        Task<PZEM017_Model> GetIdPzem017Async(Guid id); // Lấy  dữ liệu theo id 

        //POST
        Task CreatePzem017Async(PZEM017_Model data);

        //PUT
        Task UpdatePzem017Async(PZEM017_Model data);

        //DELETE
        Task DeletePzem017Async(Guid id);

    }
}
