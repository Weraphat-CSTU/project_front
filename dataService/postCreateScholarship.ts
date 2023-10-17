export type createScholarshipPlayload = {
    scholarship_name: string;
    start_date?: string;
    end_date?: string;
    scholarship_grade: number;
    class_type_id: number;
    scholarship_type_id: number;
    scholarship_condition_name: string;
    scholarship_qualification_name: string;
    scholarship_year: string;
    tag_color: string;
    
}

export type createScholarshipPlayloadRespone = {
    success: boolean;
};

export function postCreateScholarship(data: createScholarshipPlayload): Promise<createScholarshipPlayloadRespone> {
    return Promise.resolve( {success :  true });
}