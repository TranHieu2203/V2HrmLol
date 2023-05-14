using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using ProfileDAL.Repositories;
using ProfileDAL.ViewModels;
using Common.Extensions;

namespace ProfileAPI.List
{
    [Common.Middleware.HistaffAuthorize()]
    [Produces("application/json")]
    [Route("api/hr/otherlist/")]
    [Route("api/hr/otherlist/[action]")]
    public class SysOtherListController : BaseController1
    {

        public SysOtherListController(IProfileBusiness unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<ActionResult> GetAllType()
        {
            var r = await _unitOfWork.SysOtherLists.GetAllType();
            return Ok(r);
        }

        [HttpGet]
        public async Task<ActionResult> GetAllByType(OtherListDTO param)
        {
            var r = await _unitOfWork.SysOtherLists.GetAllByType(param);
            return Ok(r);
        }
        [HttpGet]
        public async Task<ActionResult> Get(int Id)
        {
            var r = await _unitOfWork.SysOtherLists.GetById(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> AddType([FromBody] SysOtherListTypeInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.CreateTypeAsync(param);
            return Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateType([FromBody] SysOtherListTypeInputDTO param)
        {
            //VALID REQUIRE
            if (param.Id == null)
            {
                return TLAResult("ID_NOT_BLANK");
            }
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.UpdateTypeAsync(param);
            return TLAResult(r);
        }

        //[HttpPost]
        //public async Task<ActionResult> ChangeStatusTypeAsync([FromBody]List<int> ids)
        //{
        //    if (ids.Count == 0)
        //    {
        //        return TLAResult("ID_NOT_BLANK");
        //    }
        //    var r = await _unitOfWork.SysOtherLists.ChangeStatusTypeAsync(ids);
        //    return TLAResult(r);
        //}

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] SysOtherListInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.TypeId == null || param.TypeId == 0)
            {
                return TLAResult("TYPE_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.CreateAsync(param);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] SysOtherListInputDTO param)
        {
            //VALID REQUIRE
            if (param.Code == null)
            {
                return TLAResult("CODE_NOT_BLANK");
            }
            if (param.Name == null)
            {
                return TLAResult("NAME_NOT_BLANK");
            }
            if (param.TypeId == null || param.TypeId == 0)
            {
                return TLAResult("TYPE_NOT_BLANK");
            }
            var r = await _unitOfWork.SysOtherLists.UpdateAsync(param);
            return TLAResult(r);
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStatus([FromBody] List<int> ids)
        {
            if (ids.Count == 0)
            {
                return TLAResult("ID_NOT_BLANK");
            }

            var r = await _unitOfWork.SysOtherLists.ChangeStatusAsync(ids);
            return TLAResult(r);
        }
        /// <summary>
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetOtherListByType(string code)
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(code);
            return TLAResult(r);
        }
        /// <summary>
        /// Get Tình trạng gia đình
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetListFamilyStatus()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.FAMILY_STATUS);
            return TLAResult(r);
        }

        /// <summary>
        /// Get Giới tính
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GENDER()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.GENDER);
            return TLAResult(r);
        }
        /// <summary>
        /// Gia canh nhan vien
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> EmpSituation()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.RELATION);
            return TLAResult(r);
        }

        /// <summary>
        /// Get Trình độ chuyên môn
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetListMajor()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.MAJOR);
            return TLAResult(r);
        }

        /// <summary>
        /// Get Trường đào tạo
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetListSchool()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.GRADUATE_SCHOOL);
            return TLAResult(r);
        }

        /// <summary>
        /// Get Trình độ học vấn
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetListLearningLevel()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.LEARNING_LEVEL);
            return TLAResult(r);
        }

        /// <summary>
        /// Get Hình thức đào tạo
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetListTrainingForm()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.TRAINING_FORM);
            return TLAResult(r);
        }

        /// <summary>
        /// LOAI HUONG PHU CAP
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetAllowanceType()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.ALLOWANCE_TYPE);
            return TLAResult(r);
        }
        /// <summary>
        /// Tôn giáo
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> RELIGION()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.RELIGION);
            return TLAResult(r);
        }
        /// <summary>
        /// Dân tộc
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> NATION()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.NATION);
            return TLAResult(r);
        }
        /// <summary>
        /// Quốc tịch
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> NATIONALITY()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.NATIONALITY);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> INSREGION()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.INS_REGION);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> INSUNIT()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.INS_UNIT);
            return TLAResult(r);
        }
        /// <summary>
        /// Quốc tịch
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> STATUSEMPLOYEE()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.STATUS_EMPLOYEE);
            return TLAResult(r);
        }
        /// <summary>
        /// Status
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> STATUSAPPROVE()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.STATUS_APPROVE);
            return TLAResult(r);
        }
        /// <summary>
        /// Loại quyết đinh
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> TYPEDECISION()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(OtherListConst.TYPE_DECISION);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> OBJECTCOMMEND()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.OBJECT_COMMEND);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> SOURCECOST()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.SOURCE_COST);
            return TLAResult(r);
        }
        [HttpGet]
        public async Task<ActionResult> STATUSBHXH()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.STATUS_BHXH);
            return TLAResult(r);
        }
        /// <summary>
        /// GetAreas
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAreas()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(SystemConfig.OTHER_AREA);
            return TLAResult(r);
        }
        /// <summary>
        /// GetGroupElement
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetGroupElementSys()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.PA_ELEMENT_GROUP);
            return TLAResult(r);
        }
        /// <summary>
        /// GetGroupElement
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetResident()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.RESIDENT);
            return TLAResult(r);
        }
        /// <summary>
        /// GetPA3PExchange
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetPA3PExchange()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListFixByType(SystemConfig.PA_3P_EXCHANGE);
            return TLAResult(r);
        }
        /// <summary>
        /// GetLeaningLvl
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetLeaningLvl()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(SystemConfig.LEARNING_LEVEL);
            return TLAResult(r);
        }

        /// <summary>
        /// GetLeaningLvl
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetListPaper()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByType(SystemConfig.PAPER);
            return TLAResult(r);
        }

        /// <summary>
        /// GetLeaningLvl
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetOtherListTreeView()
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListTreeView();
            return TLAResult(r);
        }
        [HttpGet]
        [Route("otherList-by-typeId/{Id}")]
        public async Task<ActionResult> GetOtherListByTypeID(int? Id)
        {
            var r = await _unitOfWork.SysOtherLists.GetOtherListByTypeID(Id);
            return TLAResult(r);
        }
        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] List <int> Ids)
        {
            var r = await _unitOfWork.SysOtherLists.Delete(Ids);
            return TLAResult(r);
        }
    }
}
