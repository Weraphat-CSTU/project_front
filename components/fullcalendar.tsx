import thLocale from '@fullcalendar/core/locales/th';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { getScholarship } from '@/dataService/getscholarship';
import { useQuery } from 'react-query';

export default function Fullcalendar() {
    const Router = useRouter();
    const obj = Reflect.get(Router.query, 'id') as string | null;

    const { data: scholarship, isLoading: isLoadingScholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => (obj ? getScholarship({ scholarship_id: obj }) : getScholarship()),
    });

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                    left: 'title',
                    center: 'dayGridMonth,timeGridWeek,listWeek',
                    right: 'today prev,next',
                }}
                locale={thLocale}
                dayMaxEventRows={3}
                eventClick={function (arg) {
                    Router.push(`/scholarship-detail/${arg.event.id}`);
                }}
                editable
                events={scholarship?.result.map((items) => ({
                    title: items.scholarship_name,
                    start: items.start_date,
                    end: dayjs(items.end_date).add(1, 'day').format('YYYY-MM-DD'),
                    id: items.scholarship_id,
                    color: items.tag_color,
                }))}
            />
        </div>
    );
}
