import thLocale from '@fullcalendar/core/locales/th';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useQuery } from 'react-query';
import { Grid } from 'antd';
import { getScholarshipID } from '@/dataService/getScholarshipID';
import { getScholarship } from '@/dataService/getscholarship';

export default function Fullcalendar() {
    const screens = Grid.useBreakpoint();
    const Router = useRouter();
    const obj = Reflect.get(Router.query, 'id') as string | null;

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });

    const { data: scholarshipID, isLoading: isLoadingScholarship } = useQuery({
        queryKey: 'scholarshipID',
        queryFn: async () => (obj ? getScholarshipID({ scholarship_id: obj }) : getScholarshipID()),
    });

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={
                    screens.lg
                        ? {
                              left: 'title',
                              center: 'dayGridMonth,timeGridWeek,listWeek',
                              right: 'today prev,next',
                          }
                        : undefined
                }
                fixedWeekCount
                locale={thLocale}
                dayMaxEventRows={3}
                editable
                events={scholarship?.result.map((items) => ({
                    id: items.scholarship_id,
                    title: items.scholarship_name,
                    start: items.start_date,
                    end: dayjs(items.end_date).add(1, 'day').format('YYYY-MM-DD'),
                    color: items.color_tag,
                }))}
                eventClick={function (arg) {
                    Router.push(`/scholarship-detail/${arg.event.id}`);
                }}
            />
        </div>
    );
}
