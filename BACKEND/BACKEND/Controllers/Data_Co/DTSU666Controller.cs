using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using BACKEND.Interface.IData.IDTSU666;
using BACKEND.Interface.IService.ILoggerService;
using BACKEND.Entities.Model.Data_Mo.DTSU666;
using BACKEND.Entities.DTO.DataDto.DTSU666;
using BACKEND.Extensions.Service.ActionFilters;
using BACKEND.Interface.IData.IDTSU666.Interface_Shapping_DTSU666;

namespace BACKEND.Controllers.Data_Co
{
    [Route("dtsu666")]
    [ApiController]
    public class DTSU666Controller : ControllerBase
    {
        private readonly IDTSU666_Repository _repo;
        private readonly IDataShaper<DTSU666_Get_Dto> _dataShaper;
        private readonly ILoggerService _logger;
        private readonly IMapper _map;
        public DTSU666Controller(IDTSU666_Repository repo, ILoggerService logger, IMapper map, IDataShaper<DTSU666_Get_Dto> dataShaper)
        {
            _repo = repo;
            _logger= logger;
            _map = map;
            _dataShaper = dataShaper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync([FromQuery] DTSU666_DataShapping_Dto repuestShapping, [FromQuery] DTSU666_FillterTime_Dto filterDate)
        {

            var employeesFromDb = await _repo.GetAllAsync(repuestShapping, filterDate);

            var employeesDto = _map.Map<IEnumerable<DTSU666_Get_Dto>>(employeesFromDb);

            return Ok(_dataShaper.ShapeData(employeesDto, repuestShapping.Fields));
        }



        [HttpGet("{id}")]
        [ServiceFilter(typeof(AsyncActionFilter), Order = 2)] // Triển khai bộ lọc , với thuộc tính Order là thứ tự triển khai bộ lọc có thể có hoặc không 
        //[HttpCacheExpiration(CacheLocation = CacheLocation.Public, MaxAge = 60)]
        //[HttpCacheValidation(MustRevalidate = false)]
        public async Task<IActionResult> GetDataAsync(Guid id)
        {

            var checkId = await _repo.GetAsync(id);

            if (checkId == null) return NotFound($" ======>>>>>>>  GET_ID with id: {id} doesn't exist in the database.");

            var itemDto = _map.Map<DTSU666_Get_Dto>(checkId);

            _logger.LogInfo("========>>>>>>> GET_Id  successful");

            return Ok(itemDto);

        }


        [HttpPost]
        [ServiceFilter(typeof(ValidationFilter), Order = 3)]
        public async Task<ActionResult> CreateAsync([FromBody] DTSU666_Post_Dto dataDto)
        {
            var post = _map.Map<DTSU666_Model>(dataDto);

            await _repo.CreateAsync(post);

            var itemToReturn = _map.Map<DTSU666_Get_Dto>(post);

            _logger.LogInfo("========>>>>>>> POST successful");

            return CreatedAtAction(nameof(GetAllAsync), new { id = itemToReturn.Id }, itemToReturn);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemAsync(Guid id)
        {
            var checkId = await _repo.GetAsync(id); // Kiểm tra id có tồn tại trong cơ sở dữ liệu hay không

            if (checkId == null) return NotFound($" ======>>>>>>>  DELETE_ID with id: {id} doesn't exist in the database.");   // Nếu không tồn tại thì trả về null 

            await _repo.DeleteAsync(id);

            _logger.LogInfo("========>>>>>>> DELETE_Id  successful");

            return NoContent();

        }



        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidationFilter), Order = 6)]// Triển khai bộ lọc , với thuộc tính Order là thứ tự triển khai bộ lọc có thể có hoặc không 
        public async Task<IActionResult> UpdateItemAsync(Guid id, [FromBody] DTSU666_Put_Dto itemDto) // Thuộc tính FromBody cho phép chình sửa nội dung theo id truyền vào trong cơ sở dữ liệu 
        {

            var checkId = await _repo.GetAsync(id); // Kiểm tra id có tồn tại trong cơ sở dữ liệu hay không

            if (checkId == null) return NotFound($" ======>>>>>>>  PUT_ID with id: {id} doesn't exist in the database.");

            var a = _map.Map(itemDto, checkId);

            await _repo.UpdateAsync(a);

            _logger.LogInfo("========>>>>>>> PUT_Id  successful");

            return NoContent();
        }

    }
}
