import React from 'react';
import FullCalendar from '@fullcalendar/react'; // นำเข้า FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // นำเข้าปลั๊กอิน dayGrid
import interactionPlugin from '@fullcalendar/interaction'; // นำเข้าปลั๊กอิน interaction

function MyCalendar() {
    // สร้างฟังก์ชันที่จะถูกเรียกเมื่อคลิกเหตุการณ์

    const handleEventClick = (info: { event: { title: any } }) => {
        console.log('คลิกเหตุการณ์:', info.event.title);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[
                {
                    title: 'เหตุการณ์ที่หนึ่ง',
                    start: '2023-10-10',
                },
                {
                    title: 'เหตุการณ์ที่สอง',
                    start: '2023-10-15',
                },
            ]}
            eventClick={handleEventClick} // กำหนดการคลิกเหตุการณ์
        />
    );
}

export default MyCalendar;
