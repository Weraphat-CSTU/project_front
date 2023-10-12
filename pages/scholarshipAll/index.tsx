import Layout from '@/components/layout';
import Layout2 from '@/components/layout2';
import Scholarshipall from './components/scholarship-all';
import { useEffect, useState } from 'react';

export default function scholarshipAll() {
    const [authorize, setauthorize] = useState<boolean | undefined>(undefined);
    useEffect(() => {
        const login = sessionStorage.getItem('login') == 'true' ? true : false;
        setauthorize(login);
    }, []);
    if (authorize === undefined) {
        return null;
    }
    if (authorize) {
        return (
            <Layout title="ทุนการศึกษาทั้งหมด">
                <Scholarshipall />
            </Layout>
        );
    }
    return (
        <Layout2>
            <Scholarshipall />
        </Layout2>
    );
}
