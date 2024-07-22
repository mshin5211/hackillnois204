"use server"

export const fetchEvent = async () => {

    type GroupedEvents = {
        [date: string]: Event[];
    };
    type Event = {
        eventId: number;
        name: string;
        description: string;
        startTime: string;
        endTime: string;
        date: string;
        location: [
            {
                description: string;
            }
        ];
    };
    
    const response = await fetch("https://adonix.hackillinois.org/event/", { next: { revalidate: 3600 } });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const events = data.events.sort((a: {startTime: number}, b: {startTime: number}) => a.startTime - b.startTime);

    for (const event of events) {
        const timeOptions = {
            timezone: 'America/Chicago',
            hour: 'numeric',
            minute: '2-digit',
        } as const;

        const dateOptions = {
            timezone: 'America/Chicago',
            weekday: 'long',
            month: 'long',
            day: '2-digit',
        } as const;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(`Your time zone is: ${timeZone}`);
        const timeStart = new Date(event.startTime * 1000);
        const timeEnd = new Date(event.endTime * 1000);
        const start = timeStart.toLocaleTimeString('en-US', timeOptions);
        const end = timeEnd.toLocaleTimeString('en-US', timeOptions);
        const date = timeStart.toLocaleDateString('en-US', dateOptions);

        event.startTime = start;
        event.endTime = end;
        event.date = date;
    }

    const groupedEvents = events.reduce((acc: GroupedEvents, event: Event) => {
        const dateOptions: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            // month: 'long',
            day: '2-digit',
        } as const;
        const timeStart = new Date(event.date);
        const date = timeStart.toLocaleDateString('en-US', dateOptions);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {});
 
    return groupedEvents;
}
