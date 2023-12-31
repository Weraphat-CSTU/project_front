import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import EditscholarshipInner from './components/editscholarshipinner';

export default function Editscholarship() {
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
            <Layout title="ทุนการศึกษา" subTitle="แก้ไขทุนการศึกษา">
                <EditscholarshipInner />
            </Layout>
        );
    }
}
