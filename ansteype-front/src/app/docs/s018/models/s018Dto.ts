

  export interface  S018SeachDto {
    year:  string;
    month:  string;
    week:  string;
    // 代理店
    agency: string;
  }

  export interface TemporarySaveInfoDto {
    id: string;
    matter_master_exe_id: string;
    google_excel_name: string;
    google_excel_sheet_name: string;
    temporary_save_type: string;
    estimation_request_type: string;
    exe_date: string;
    exe_name: string;
    creation_date: string;
    creator: string;
    del_flg: string;
    last_update_date: string;
    last_updater: string;
    conditions_year: string;
    conditions_month: string;
    conditions_week: string;
    conditions_agency: string;
  }
  