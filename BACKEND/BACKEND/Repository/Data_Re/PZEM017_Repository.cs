using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using BACKEND.Interface.IData.IPZEM017;
using BACKEND.Entities.Model.Data_Mo.PZEM017;
using BACKEND.Entities.DTO.DataDto.PZEM017;


namespace BACKEND.Repository.Data_Re
{
    public class PZEM017_Repository : IPZEM017_Repository
    {
        private const string databaseName = "PZEM017";   // Thuộc tính tên cơ sở dữ liệu 

        private const string collectionName = "Data_Pzem017"; // Thuộc tính tên của bộ sưu tập 

        private readonly FilterDefinitionBuilder<PZEM017_Model> filterBuilder = Builders<PZEM017_Model>.Filter; // Thuộc tính bộ lọc 

        private readonly IMongoCollection<PZEM017_Model> pzemCollection; // Tạo bộ sưu tập từ lớp Item

        public PZEM017_Repository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName); // Tham chiếu đến tên cơ sở dữ liệu 

            pzemCollection = database.GetCollection<PZEM017_Model>(collectionName);// Tham chiếu đến tên bộ sưu tập 

        }
   
     
        //GET
        public async Task<IEnumerable<PZEM017_Model>> GetAllPzem017Async(PZEM017_DataShapping_Dto repuestShapping, PZEM017_FillterTime_Dto fillter)
        {
            var builder = Builders<PZEM017_Model>.Filter;

            var filter = builder.Empty;

            if (fillter.Start1 != null)
            {
                filter &= builder.Gte("Date1", fillter.Start1);
            }

            if (fillter.End1 != null)
            {
                filter &= builder.Lte("Date1", fillter.End1);
            }


            var result = await pzemCollection.FindAsync(filter);

            return await result.ToListAsync();
        }


        //GET ID
        public async Task<PZEM017_Model> GetIdPzem017Async(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id); // Id phải khớp với Id nhận được từ tham số 
            return await pzemCollection.Find(filter).SingleOrDefaultAsync(); // Phương thức SingleorDefult chỉ cho phép trả về 1 dữ liệu bất kì tìm thấy 
        }


        //POST
        public async Task CreatePzem017Async(PZEM017_Model data)
        {
            await pzemCollection.InsertOneAsync(data);
        }


        //PUT
        public async Task UpdatePzem017Async(PZEM017_Model data)
        {
            var filter = filterBuilder.Eq(exsitingItem => exsitingItem.Id, data.Id); // Lọc theo id 
            await pzemCollection.ReplaceOneAsync(filter, data);
        }

        //DELETE
        public async Task DeletePzem017Async(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id); // Lọc theo Id
            await pzemCollection.DeleteOneAsync(filter); // Mỗi lần thực thi sẽ xóa theo id truyền vào 
        }

    }
}
