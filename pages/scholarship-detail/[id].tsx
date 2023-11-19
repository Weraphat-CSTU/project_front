import Layout from '@/components/layout';
import Layout2 from '@/components/layout2';
import ScholarshipDetailInner from './components/scholarshipInner';
import { useEffect, useState } from 'react';

export default function scholarshipDetail() {
    const [authorize, setauthorize] = useState<boolean | undefined>(undefined);
    useEffect(() => {
        const login = sessionStorage.getItem('accessToken') ? true : false;
        setauthorize(login);
    }, []);
    if (authorize === undefined) {
        return null;
    }
    if (authorize) {
        return (
            <Layout title="ทุนการศึกษา" subTitle="รายละเอียด">
                <ScholarshipDetailInner />
            </Layout>
        );
    }
    return (
        <Layout2>
            <ScholarshipDetailInner />
        </Layout2>
    );
}
