


type Event = {
    eventId: number;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    date: string;
    locations: [
        {
            description: string
        }
    ];
    points: number;
    eventType: string;
};

export const EventCard = ({ eventId, name, description, startTime, endTime, locations, points, eventType }: Event) => {
    return (
        <div key={eventId} id={`card-${eventId}`} className={`flex flex-col gap-1 bg-[#2a3f51] bg-opacity-30 backdrop-blur-sm w-full p-5 border-2 rounded-xl`}>
            <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
                <h2 className='text-white text-2xl font-bold'>{name}</h2>
                <div className='flex flex-wrap gap-2'>
                    <p className={`${points > 0 ? 'bg-blue-500' : 'bg-blue-300'} py-1 px-2 text-white rounded-xl font-medium min-w-fit`}>{points} PTS</p>
                    <p id={`tag-${eventId}`} className='py-1 px-2 text-white rounded-xl font-medium min-w-fit'>{eventType}</p>
                </div>
            </div>
            <p className='text-white'>{startTime} - {endTime}</p>
            {locations.length > 0 ? <p className='text-white'>{locations[0].description}</p> : null}
            <p className='text-md text-white'>{description}</p>
        </div>
    );
};