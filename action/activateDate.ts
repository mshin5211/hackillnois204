import { fetchEvent } from '@/action/fetchEvent';

type Event = {
    eventId: number;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    date: string;
    locations: [
      {
        description: string;
      }
    ];
    points: number;
    eventType: string;
};

export const activateDate = async ( activeDate: string ) => {
    const events = await fetchEvent();
    Object.keys(events).map((date) => {
        events[date].map((event: Event) => {
            const eventCardElement = document.getElementById(`card-${event.eventId}`);
            const eventTagElement = document.getElementById(`tag-${event.eventId}`);
            const eventType = event.eventType;
            if (!eventCardElement || !eventTagElement) return;
            switch (eventType) {
                case 'MEAL':
                    eventCardElement.style.borderColor = '#00BFB2';
                    eventTagElement.style.backgroundColor = '#00BFB2';
                    break;
                case 'MINIEVENT':
                    eventCardElement.style.borderColor = '#8B80F9';
                    eventTagElement.style.backgroundColor = '#8B80F9';
                    break;
                case 'WORKSHOP':
                    eventCardElement.style.borderColor = '#A288E3';
                    eventTagElement.style.backgroundColor = '#A288E3';
                    break;
                case 'QNA':
                    eventCardElement.style.borderColor = '#F90093';
                    eventTagElement.style.backgroundColor = '#F90093';
                    break;
                case 'SPEAKER':
                    eventCardElement.style.borderColor = '#D65780';
                    eventTagElement.style.backgroundColor = '#D65780';
                    break;
                case 'OTHER':
                    eventCardElement.style.borderColor = '#FEA82F';
                    eventTagElement.style.backgroundColor = '#FEA82F';
                    break;
                default:
                    break;
            }
        })
    })
    const activeDivElement = document.getElementById(`div-${activeDate}`);
    Object.keys(events).map((date) => {
        const divElement = document.getElementById(`div-${date}`);
        if (divElement) {
            divElement.style.backgroundColor = '#172554';
        }
    });
    if (activeDivElement) {
        activeDivElement.style.backgroundColor = '#1e3a8a';
    }
    const activeTextElement = document.getElementById(`text-${activeDate}`);
    Object.keys(events).map((date) => {
        const textElement = document.getElementById(`text-${date}`);
        if (textElement) {
            textElement.classList.remove('font-bold');
        }
    });
    if (activeTextElement) {
        activeTextElement.classList.add('font-bold');
    }
    const activeEventElement = document.getElementById(`event-${activeDate}`);
    Object.keys(events).map((date) => {
        const eventElement = document.getElementById(`event-${date}`);
        if (eventElement) {
            eventElement.classList.remove('flex');
            eventElement.classList.add('hidden');
        }
    });
    if (activeEventElement) {
        activeEventElement.classList.remove('hidden');
        activeEventElement.classList.add('flex');
    }
    return;
}
