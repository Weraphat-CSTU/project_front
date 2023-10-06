import thLocale from '@fullcalendar/core/locales/th';
import dayjs from 'dayjs';
import { getCalendar } from '@/dataService/getcalendar';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getScholarship } from '@/dataService/getscholarship';
import { useQuery } from 'react-query';

export default function Fullcalendar() {
    const Router = useRouter();
    const { data: scholarship, isLoading: isLoadingScholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    const { data: calendar, isLoading: isLoadingCalendar } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getCalendar(),
    });
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'title',
                    center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    right: 'today prev,next',
                }}
                locale={thLocale}
                dayMaxEventRows={3}
                eventClick={function (arg) {
                    Router.push(`/scholarship-detail/${arg.event.id}`);
                }}
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
