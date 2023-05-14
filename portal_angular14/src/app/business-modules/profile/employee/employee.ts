export interface IEmployee {
    id: number,
    employee_code: string,
    fullname_vn: string,
    fullname_en: string,
    join_date: string | null,
    org_name_vn: string | null,
    org_name_en: string | null,
    work_status: number | null,
    job_name_vn: string | null,
    job_name_en: string | null,
    itime_id: number | null
}