using Common.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AttendanceDAL.ViewModels
{
    public class WorkSignDTO : Pagings
    {
        public int ORG_ID { get; set; }
        public int PERIOD_ID { get; set; }
        public string EMPLOYEE_NAME { get; set; }
        public string EMPLOYEE_CODE { get; set; }
        public string ORG_NAME { get; set; }
        public string POSITION_NAME { get; set; }
        public int TYPE { get; set; }
    }
    public class WorkSignInputDTO
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int YearId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int ShiftId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int PeriodId { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public int ObjectId { get; set; }
        public List<int> OrgIds { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public List<long> EmpIds { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime DateStart { get; set; }
        [Required(ErrorMessage = "{0}_Required")]
        public DateTime DateEnd { get; set; }
        public int Type { get; set; }
    }
    public class WorkSignDeleteDTO
    {
        public List<int> Ids { get; set; }
        public int PeriodId { get; set; }
        public int Type { get; set; }
    }
    public class ExportTemplateDTO
    {
        public int OrgId { get; set; }
        public int PeriodId { get; set; }
    }
    public class ImportWorkSignParam
    {
        public List<ImportExcelDTO> Data { get; set; }
    }

    public class ImportExcelDTO
    {
        public long? Id { get; set; }
        public int? TenantId { get; set; }
        public long? PeriodId { get; set; }
        public long? EmployeeId { get; set; }
        public string Code { get; set; }
        public string Day1 { get; set; }
        public string Day2 { get; set; }
        public string Day3 { get; set; }
        public string Day4 { get; set; }
        public string Day5 { get; set; }
        public string Day6 { get; set; }
        public string Day7 { get; set; }
        public string Day8 { get; set; }
        public string Day9 { get; set; }
        public string Day10 { get; set; }
        public string Day11 { get; set; }
        public string Day12 { get; set; }
        public string Day13 { get; set; }
        public string Day14 { get; set; }
        public string Day15 { get; set; }
        public string Day16 { get; set; }
        public string Day17 { get; set; }
        public string Day18 { get; set; }
        public string Day19 { get; set; }
        public string Day20 { get; set; }
        public string Day21 { get; set; }
        public string Day22 { get; set; }
        public string Day23 { get; set; }
        public string Day24 { get; set; }
        public string Day25 { get; set; }
        public string Day26 { get; set; }
        public string Day27 { get; set; }
        public string Day28 { get; set; }
        public string Day29 { get; set; }
        public string Day30 { get; set; }
        public string Day31 { get; set; }
    }
}
