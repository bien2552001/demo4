using AutoMapper;
using BACKEND.Extensions.Service.ActionFilters;
using BACKEND.Interface.IService.ILoggerService;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using BACKEND.Interface.IData.IPZEM017;
using BACKEND.Entities.DTO.DataDto.PZEM017;
using BACKEND.Entities.Model.Data_Mo.PZEM017;
using BACKEND.Interface.IData.IDTSU666.Interface_Shapping_DTSU666;
using BACKEND.Entities.DTO.DataDto.DTSU666;

namespace BACKEND.Controllers.Data_Co
{
    [Route("pzem017")]
    [ApiController]
    public class PZEM017Controller : ControllerBase
    {
        private readonly IPZEM017_Repository _repo;
        private readonly IDataShaper<PZEM017_Get_Dto> _dataShaper;
        private readonly ILoggerService _logger;
        private readonly IMapper _map;
        public PZEM017Controller(IPZEM017_Repository repo, ILoggerService logger, IMapper map, IDataShaper<PZEM017_Get_Dto> dataShaper)
        {
            _repo = repo;
            _logger = logger;
            _map = map;
            _dataShaper = dataShaper;
        }


        //GET 
        [HttpGet]
        public async Task<IActionResult> GetAllAsync([FromQuery] PZEM017_DataShapping_Dto repuestShapping, [FromQuery] PZEM017_FillterTime_Dto fillterTime)
        {

            var pzemFromDb = await _repo.GetAllPzem017Async(repuestShapping, fillterTime);

            var pzemDto = _map.Map<IEnumerable<PZEM017_Get_Dto>>(pzemFromDb);

            return Ok(_dataShaper.ShapeData(pzemDto, repuestShapping.Fields1));
        }



        [HttpGet("{id}")]
        [ServiceFilter(typeof(AsyncActionFilter), Order = 2)] // Triển khai bộ lọc , với thuộc tính Order là thứ tự triển khai bộ lọc có thể có hoặc không 
        //[HttpCacheExpiration(CacheLocation = CacheLocation.Public, MaxAge = 60)]
        //[HttpCacheValidation(MustRevalidate = false)]
        public async Task<IActionResult> GetIdPzem017Async(Guid id)
        {

            var checkId = await _repo.GetIdPzem017Async(id);

            if (checkId == null) return NotFound($" ======>>>>>>>  PZEM017 with id: {id} doesn't exist in the database.");

            var itemDto = _map.Map<PZEM017_Get_Dto>(checkId);

            _logger.LogInfo("========>>>>>>> GET_Id  successful");

            return Ok(itemDto);

        }



        //POST
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilter), Order = 3)]
        public async Task<ActionResult> CreateAsync([FromBody] PZEM017_Post_Dto dataDto)
        {
            var post = _map.Map<PZEM017_Model>(dataDto);

            await _repo.CreatePzem017Async(post);

            var itemToReturn = _map.Map<PZEM017_Get_Dto>(post);

            _logger.LogInfo("========>>>>>>> PZEM017: POST successful");

            return CreatedAtAction(nameof(GetAllAsync), new { name = itemToReturn.Name }, itemToReturn);
        }



        //DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemAsync(Guid id)
        {
            var checkId = await _repo.GetIdPzem017Async(id); // Kiểm tra id có tồn tại trong cơ sở dữ liệu hay không

            if (checkId == null) return NotFound($" ======>>>>>>>  DELETE_ID with id: {id} doesn't exist in the database.");   // Nếu không tồn tại thì trả về null 

            await _repo.DeletePzem017Async(id);

            _logger.LogInfo("========>>>>>>> PZEM017: DELETE_Id  successful");

            return NoContent();

        }


        //PUT
        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidationFilter), Order = 6)]// Triển khai bộ lọc , với thuộc tính Order là thứ tự triển khai bộ lọc có thể có hoặc không 
        public async Task<IActionResult> UpdateItemAsync(Guid id, [FromBody] DTSU666_Put_Dto itemDto) // Thuộc tính FromBody cho phép chình sửa nội dung theo id truyền vào trong cơ sở dữ liệu 
        {

            var checkId = await _repo.GetIdPzem017Async(id); // Kiểm tra id có tồn tại trong cơ sở dữ liệu hay không

            if (checkId == null) return NotFound($" ======>>>>>>> PZEM017: PUT_ID with id: {id} doesn't exist in the database.");

            var a = _map.Map(itemDto, checkId);

            await _repo.UpdatePzem017Async(a);

            _logger.LogInfo("========>>>>>>> PZEM017: PUT_Id  successful");

            return NoContent();
        }


    }
}


