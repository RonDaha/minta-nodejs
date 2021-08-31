export interface WeatherData {
    sol_keys: string[];
    validity_checks: WeatherDataValidityChecks;
}

export interface WeatherDataValidityChecks {
    sol_hours_required: number;
    sols_checked: number[];
    [key: number]: { HWS: HwsData }
}

export interface HwsData {
    av: number;
    ct: number;
    mn: number;
    mx: number;
}
