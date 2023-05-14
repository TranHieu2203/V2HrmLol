using Common.Paging;
using System;

namespace ProfileDAL.ViewModels
{
    public class PositionViewDTO : Pagings
    {
        public int Id { get; set; }
        public int? GroupId { get; set; }
        public string GroupName { get; set; }
        public string Name { get; set; }
        public string NameEn { get; set; }
        public string Code { get; set; }
        public int? IsActive { get; set; }
        public string JobDesc { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? orgid { get; set; }
        public string orgname { get; set; }
        public int? jobid { get; set; }
        public string jobname { get; set; }
        public int? lm { get; set; }
        public string lmname { get; set; }
        public bool? isowner { get; set; }
        public int? csm { get; set; }
        public string csmname { get; set; }
        public bool? isnonphysical { get; set; }
        public bool? isMaster { get; set; }
        public int? master { get; set; }
        public string mastername { get; set; }
        public string mastercode { get; set; }
        public bool? isConcurrently { get; set; }
        public int? concurrent { get; set; }
        public bool? isplan { get; set; }
        public bool? isInterim { get; set; }
        public int? interim { get; set; }
        public string interimname { get; set; }
        public DateTime? effectivedate { get; set; }
        public string typeactivities { get; set; }
        public string filename { get; set; }
        public string uploadfile { get; set; }
        public int? workingtime { get; set; }
        public PositionDesriptionInputDTO _positionDesc { get; set; }
        public string remark { get; set; }
        public int? hiringStatus { get; set; }
        public int? flag { get; set; }
        public int? both { get; set; }
        public string color { get; set; }
        public int? orgIdSearch { get; set; }
        public int? orgId2Search { get; set; }
        public string textboxSearch { get; set; }
        public string textbox2Search { get; set; }
    }
    public class PositionOutputDTO
    {
        public int Id { get; set; }
        public int? GroupId { get; set; }
        public string Name { get; set; }
        public string NameEn { get; set; }
        public string Code { get; set; }
        public int? IsActive { get; set; }
        public string Note { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? orgid { get; set; }
        public string orgname{get;set;}        
        public int? jobid { get; set; }
        public string jobname { get; set; }
        public int? lm { get; set; }
        public string lmname{get;set;}  
        public string lmposition{get;set;}  
        public bool? isowner { get; set; }
        public int? csm { get; set; }
        public string csmname{get;set;}  
        public string csmposition{get;set;}  
        public bool? isnonphysical { get; set; }
        public int? master { get; set; }
        public string mastername{get;set;}  
        public int? concurrent { get; set; }
        public bool? isplan { get; set; }
        public int? interim { get; set; }
        public string interimname{get;set;}  
        public DateTime? effectivedate { get; set; }
        public string typeactivities { get; set; }
        public string filename { get; set; }
        public string uploadfile { get; set; }
        public int? workingtime { get; set; }
        public PositionDesriptionOutputDTO positionDesc { get; set; }
        public string remark { get; set; }
        public int? hiringStatus { get; set; }
        public int? flag { get; set; }
        public int? both { get; set; }
        public string color { get; set; }
        public int? orgIdSearch { get; set; }
        public int? orgId2Search { get; set; }
        public string textboxSearch { get; set; }
        public string textbox2Search { get; set; }
        public bool? isMaster { get; set; }
        public string mastercode { get; set; }
        public bool? isConcurrently { get; set; }
        public bool? isInterim { get; set; }
    }

    public class PositionInputDTO
    {
       public int? id { get; set; }
       public int? groupId { get; set; }
       public string code{ get; set; }
       public string name{ get; set; }
       public string NameEn { get; set; }
       public string note{ get; set; }
       public string jobDesc{ get; set; }
       public int? tenantId { get; set; }
       public int? isActive{ get; set; }
       public string createBy{ get; set; }
       public string updatedBy{ get; set; }
       public DateTime? createDate{ get; set; }
       public DateTime? updatedDate{ get; set; }  
       public int? orgid{ get; set; }
       public int? jobid{ get; set; }
       public int? lm{ get; set; }
       public bool? isowner{ get; set; }
       public int? csm{ get; set; }
       public bool? isnonphysical{ get; set; }
       public int? master{ get; set; }
       public string masterName { get; set; }
       public int? concurrent{ get; set; }
       public bool? isplan{ get; set; }
       public int? interim{ get; set; }
       public DateTime? effectivedate{ get; set; }
       public string typeactivities{ get; set; }
       public string filename{ get; set; }
       public string uploadfile{ get; set; }
       public int? workingtime{ get; set; }
       public bool? isPlanLeft { get; set; }
       public PositionDesriptionInputDTO _positionDesc { get; set; }
       public string remark { get; set; }
       public int? hiringStatus { get; set; }
       public int? flag { get; set; }
       public int? both { get; set; }
       public string color { get; set; }
       public int? orgIdSearch { get; set; }
       public int? orgId2Search { get; set; }
       public string textboxSearch { get; set; }
       public string textbox2Search { get; set; }
       public int? workLocation { get; set; }
       public bool? isMaster { get; set; }
       public string mastercode { get; set; }
       public bool? isConcurrently { get; set; }
       public bool? isInterim { get; set; }

    }

}
