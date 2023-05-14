using Common.Paging;
using System;

namespace ProfileDAL.ViewModels
{
    public class ProvinceDTO : Pagings
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
       
        public Boolean? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class ProvinceInputDTO
    {
        public int? ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }


    public class DistrictDTO : Pagings
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public Boolean? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
    public class DistrictInputDTO
    {
        public int? ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int ProvinceId { get; set; }
    }

    public class WardDTO : Pagings
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public int? DistrictId { get; set; }
        public string DistrictName { get; set; }
        public Boolean? IsActive { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class WardInputDTO
    {
        public int? ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int DistrictId { get; set; }
    }
}
