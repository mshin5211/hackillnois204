"use client"
import React, { useState, useEffect, use, useMemo } from "react";
import { fetchEvent } from "@/action/fetchEvent";
import { EventCard } from "@/components/event-card";
import { activateDate } from "@/action/activateDate";
import Image from "next/image";
import carnival from "../public/carnival.jpg";
import firework from '../public/firework1.png';

export default function Home() {

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
    locations: [
      {
        description: string;
      }
    ];
    points: number;
    eventType: string;
  };

  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDate, setActiveDate] = useState("");

  useEffect(() => {
    fetchEvent()
      .then((data) => {
        setEvent(data);
        setActiveDate(Object.keys(data)[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    activateDate(activeDate);
  }, [loading, activeDate]);

  return (
    <div className='relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip'>
    <div className={`flex w-screen items-start h-[45vh] relative flex-col bg-gradient-to-t from-[#0D1333] to-[#021227] justify-center`}>
      {/* <Image src={flag} alt='flag' fill={true} object-fit="contain" sizes='40px' /> */}
      <h1 className='text-3xl md:text-4xl shadow-black shadow-md p-3 font-bold text-white z-10 min-w-fit mx-auto place-self-start'>HackIllinois Schedule</h1>
      <div className='aspect-square w-full absolute top-0 left-0 select-none'>
          <Image src={firework} alt='firework' className='w-full' />
      </div>
      <div className='flex w-full absolute bottom-0 flex-col gap-y-5 justify-center items-center'>
        <h1 className='text-3xl font-semibold z-10 text-white place-self-center'>February</h1>
        <div className='flex justify-center items-center gap-2 text-white z-10 place-self-center'>
          {Object.keys(events).map((date) => {
            return (
              <div id={`div-${date}`}  key={date} className='flex bg-blue-950 hover:cursor-pointer p-3 rounded-md' onClick={() => {setActiveDate(date)}}>
                <h1 id={`text-${date}`} className='text-sm text-nowrap min-w-fit'>{date}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
    <div className='flex min-h-[55vh] w-screen justify-center bg-[url("../public/carnival.jpg")] bg-cover'>
      {Object.keys(events).map((date) => {
        return (
          <div key={date} className='flex relative rounded-xl'>
            <div id={`event-${date}`} className='m-5 border border-white p-5 rounded-xl hidden md:max-w-[60vw] max-w-[80vw] h-96 overflow-hidden overflow-y-scroll gap-y-3 flex-col'>
              {events[date].map((event: Event) => (
                <EventCard key={event.eventId} {...event} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
