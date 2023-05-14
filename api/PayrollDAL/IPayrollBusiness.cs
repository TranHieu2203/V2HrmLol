namespace PayrollDAL.Repositories
{
    public interface IPayrollBusiness
    {
        ISalaryElementRepository SalaryElementRepository { get; }
        ISalaryStructureRepository SalaryStructureRepository { get; }
        IFormulaRepository FormulaRepository { get; }
        IElementGroupRepository ElementGroupRepository { get; }
        IKpiGroupRepository KpiGroupRepository { get; }
        IKpiTargetRepository KpiTargetRepository { get; }
        IKpiFormulaRepository KpiFormulaRepository { get; }
        IKpiPositionRepository KpiPositionRepository { get; }
        IKpiEmployeeRepository KpiEmployeeRepository { get; }
        IAdvanceRepository AdvanceRepository { get; }
        IReportRepository ReportRepository { get; }
        ISalaryImportRepository SalaryImportRepository { get; }
        IPaycheckRepository PaycheckRepository { get; }
       
    }
}
