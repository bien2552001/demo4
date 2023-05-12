using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using BACKEND.Entities.Model.Data_Mo.DTSU666;
using BACKEND.Interface.IData.IDTSU666;
using BACKEND.Entities.DTO.DataDto.DTSU666;
using MongoDB.Bson;

namespace BACKEND.Repository.Data_Re
{
    public class DTSU666_Repository: IDTSU666_Repository
    {
        private const string databaseName = "DTSU666";   // Thuộc tính tên cơ sở dữ liệu 

        private const string collectionName = "value"; // Thuộc tính tên của bộ sưu tập 

        private readonly FilterDefinitionBuilder<DTSU666_Model> filterBuilder = Builders<DTSU666_Model>.Filter; // Thuộc tính bộ lọc 

        private readonly IMongoCollection<DTSU666_Model> currentCollection; // Tạo bộ sưu tập từ lớp Item



        public DTSU666_Repository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName); // Tham chiếu đến tên cơ sở dữ liệu 

            currentCollection = database.GetCollection<DTSU666_Model>(collectionName);// Tham chiếu đến tên bộ sưu tập 

        }




        //GET
        public async Task<IEnumerable<DTSU666_Model>> GetAllAsync(DTSU666_DataShapping_Dto repuestShapping, DTSU666_FillterTime_Dto dtsufilterDate)
        {
            var builder = Builders<DTSU666_Model>.Filter;

            var filter = builder.Empty;

            if (dtsufilterDate.start != null)
            {
                filter &= builder.Gte("Date", dtsufilterDate.start);
            }

            if (dtsufilterDate.end != null)
            {
                filter &= builder.Lte("Date", dtsufilterDate.end);
            }

            var result = await currentCollection.FindAsync(filter);

            return await result.ToListAsync();
        }


        //GET ID
        public async Task<DTSU666_Model> GetAsync(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id); // Id phải khớp với Id nhận được từ tham số 
            return await currentCollection.Find(filter).SingleOrDefaultAsync(); // Phương thức SingleorDefult chỉ cho phép trả về 1 dữ liệu bất kì tìm thấy 
        }


        //POST
        public async Task CreateAsync(DTSU666_Model data)
        {
            await currentCollection.InsertOneAsync(data);
        }



        //PUT
        public async Task UpdateAsync(DTSU666_Model data)
        {
            var filter = filterBuilder.Eq(exsitingItem => exsitingItem.Id, data.Id); // Lọc theo id 
            await currentCollection.ReplaceOneAsync(filter, data);
        }



        //DELETE
        public async Task DeleteAsync(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id); // Lọc theo Id
            await currentCollection.DeleteOneAsync(filter); // Mỗi lần thực thi sẽ xóa theo id truyền vào 
        }




    }
}
