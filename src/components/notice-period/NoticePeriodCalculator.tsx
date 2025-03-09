'use client'

import { useState } from 'react';

export default function NoticePeriodCalculator() {
  const [startDate, setStartDate] = useState<string>('');
  const [noticeDays, setNoticeDays] = useState<any>('');
  const [endDate, setEndDate] = useState<string>('');
  const [weekDay, setWeekDay] = useState<string>('');
  const [nextMonday, setNextMonday] = useState<string>('');

  const calculateEndDate = () => {
    if (!startDate || !noticeDays || isNaN(noticeDays)) return;
    const start = new Date(startDate);
    start.setDate(start.getDate() + parseInt(noticeDays));
    const day = start.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' : (day % 10 === 2 && day !== 12) ? 'nd' : (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
    const formattedDate = `${day}${suffix} ${start.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).replace(/ /g, ' ')}`;
    setEndDate(formattedDate);
    setWeekDay(start.toLocaleDateString('en-US', { weekday: 'long' }));
    const daysUntilMonday = (8 - start.getDay()) % 7 || 7;
    const monday = new Date(start);
    monday.setDate(start.getDate() + daysUntilMonday);
    setNextMonday(monday.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  };


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Notice Period Calculator</h1>
        
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium mb-2">Notice Period (days)</label>
        <input 
          type="number" 
          value={noticeDays} 
          onChange={(e) => setNoticeDays(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
          onClick={calculateEndDate} 
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
          Calculate End Date
        </button>

        {(endDate || weekDay || nextMonday) && (
          <>
            <div className="mt-4 text-center text-lg font-medium">
              Your notice period end date is <div className="text-green-600 font-bold p-2 text-xl">{endDate} on {weekDay}</div> 
            </div>
            <div className="text-center text-lg font-medium mt-4">
              <span className="text-sm">Upcoming Monday:  {nextMonday}</span>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
