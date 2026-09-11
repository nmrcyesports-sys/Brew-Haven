import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../components/ImageWithFallback';
import { Link } from 'react-router-dom';

const TABLES = [
  { id: 'T01', capacity: 2, x: 20, y: 20, status: 'available' },
  { id: 'T02', capacity: 2, x: 20, y: 50, status: 'reserved' },
  { id: 'T03', capacity: 4, x: 50, y: 35, status: 'available' },
  { id: 'T04', capacity: 4, x: 50, y: 70, status: 'available' },
  { id: 'T05', capacity: 6, x: 80, y: 50, status: 'unavailable' },
  { id: 'T06', capacity: 4, x: 80, y: 20, status: 'available' },
];

const TIME_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const PARTY_SIZES = ["1 Person", "2 People", "3 People", "4 People", "5+ People"];

export function Reservation() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('2025-04-20');
  const [time, setTime] = useState('10:00 AM');
  const [guests, setGuests] = useState('2 People');
  const [selectedTable, setSelectedTable] = useState<string | null>('T06');
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleNext = () => setStep(step + 1);
  
  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const clientName = formData.get('name') as string;
    const clientEmail = formData.get('email') as string;
    const clientPhone = formData.get('phone') as string;
    const specialRequests = formData.get('requests') as string;

    // Send email to client
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: clientEmail,
          subject: 'Reservation Confirmed - Brew Haven',
          text: `Hi ${clientName},\n\nYour reservation at Brew Haven is confirmed!\n\nDate: ${date}\nTime: ${time}\nParty Size: ${guests}\nTable: ${selectedTable || 'Assigned on arrival'}\n\nWe look forward to seeing you.\n\nBrew Haven`
        })
      });
      
      // Send email to Admin
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'admin@brewhaven.example',
          subject: 'New Reservation - Brew Haven',
          text: `New reservation received:\n\nName: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nDate: ${date}\nTime: ${time}\nParty Size: ${guests}\nTable: ${selectedTable || 'None'}\nRequests: ${specialRequests || 'None'}`
        })
      });
    } catch (err) {
      console.error("Failed to send booking emails", err);
    }
    
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#160B07]">
        <CheckCircle2 className="w-20 h-20 text-[#D6A45D] mb-6" />
        <h2 className="font-serif text-4xl text-[#F4E5CB] mb-4">Reservation Confirmed</h2>
        <p className="text-white/50 mb-8 max-w-md text-sm">
          We've reserved table {selectedTable} for {guests} on {date} at {time}. 
          We look forward to serving you.
        </p>
        <div className="p-6 bg-black/40 rounded-3xl border border-white/5 mb-8">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Booking ID</div>
          <div className="font-mono text-2xl tracking-widest text-[#F4E5CB]">AUR-{Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
        </div>
        <Link to="/" className="px-8 py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl text-[#F4E5CB] mb-4">Book a Table</h1>
          <p className="text-white/50 text-sm">Reserve your spot for a perfect experience.</p>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {[
            { num: 1, label: 'Date & Time' },
            { num: 2, label: 'Select Table' },
            { num: 3, label: 'Details' },
            { num: 4, label: 'Confirm' }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 sm:gap-4">
              <div className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full border transition-colors text-xs font-medium",
                step >= s.num 
                  ? "bg-transparent border-white/20 text-white" 
                  : "bg-transparent text-white/20 border-transparent"
              )}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px]",
                  step >= s.num ? "bg-[#D6A45D] text-[#160B07]" : "bg-white/10 text-white/40"
                )}>
                  {s.num}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < 3 && <div className={cn("w-4 sm:w-8 h-[1px]", step > s.num ? "bg-white/20" : "bg-white/5")} />}
            </div>
          ))}
        </div>

        <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Date, Time, Party Size */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Date Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F4E5CB] mb-4">Select Date</h3>
                  <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="text-sm font-medium text-white">April 2025</div>
                      <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Mock Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d} className="text-white/30 py-2">{d}</div>
                      ))}
                      {Array.from({ length: 30 }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = day === 20;
                        const isPast = day < 15;
                        return (
                          <button
                            key={i}
                            disabled={isPast}
                            onClick={() => setDate(`2025-04-${day.toString().padStart(2, '0')}`)}
                            className={cn(
                              "w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-all",
                              isSelected ? "bg-[#D6A45D] text-[#160B07] font-bold" : 
                              isPast ? "text-white/10 cursor-not-allowed" : 
                              "text-white/70 hover:bg-white/10"
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F4E5CB] mb-4">Select Time</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS.map(t => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={cn(
                          "py-2.5 rounded-xl border text-xs font-medium transition-all",
                          time === t
                            ? "bg-[#D6A45D]/10 border-[#D6A45D] text-[#D6A45D]"
                            : "bg-black/40 border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F4E5CB] mb-4">Party Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {PARTY_SIZES.map(p => (
                      <button
                        key={p}
                        onClick={() => setGuests(p)}
                        className={cn(
                          "px-4 py-2.5 rounded-xl border text-xs font-medium transition-all",
                          guests === p
                            ? "bg-[#D6A45D]/10 border-[#D6A45D] text-[#D6A45D]"
                            : "bg-black/40 border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="w-full py-4 bg-[#D6A45D] text-[#160B07] rounded-xl text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors mt-8"
                >
                  Find Available Tables →
                </button>
              </div>

              {/* Right Column: Floor Plan */}
              <div className="lg:col-span-7 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-[#F4E5CB]">Floor Plan</h3>
                  <div className="flex items-center gap-4 text-[10px] text-white/50">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#160B07] border border-[#D6A45D]"></div> Available</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#D6A45D]"></div> Selected</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-white/20"></div> Reserved</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-900/30"></div> Unavailable</div>
                  </div>
                </div>

                <div className="flex-grow relative bg-black/60 rounded-3xl border border-white/10 overflow-hidden min-h-[400px]">
                  {/* Floor Plan Background - simple representation */}
                  <div className="absolute inset-x-0 top-0 h-12 bg-white/5 flex items-center justify-center text-white/30 text-[10px] tracking-widest uppercase border-b border-white/5">
                    Window View
                  </div>
                  
                  {TABLES.map((t) => (
                    <button
                      key={t.id}
                      disabled={t.status !== 'available'}
                      onClick={() => setSelectedTable(t.id)}
                      className={cn(
                        "absolute w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold transition-all border",
                        t.status === 'available' ? 'bg-[#160B07] border-white/20 text-white hover:border-[#D6A45D] hover:text-[#D6A45D]' : '',
                        t.status === 'reserved' ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed' : '',
                        t.status === 'unavailable' ? 'bg-red-900/10 border-red-900/30 text-red-500/30 cursor-not-allowed' : '',
                        selectedTable === t.id ? 'bg-[#D6A45D] border-[#D6A45D] text-[#160B07] shadow-[0_0_15px_rgba(214,164,93,0.4)]' : ''
                      )}
                      style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    >
                      {t.id}
                      <div className="absolute -bottom-5 text-[9px] text-white/40 whitespace-nowrap">
                        {t.capacity} seats
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Table Info (If any) */}
                {selectedTable && (
                  <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#D6A45D]/10 border border-[#D6A45D]/30 flex items-center justify-center">
                        <span className="text-[#D6A45D] font-bold text-sm">{selectedTable}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white mb-1">Table {selectedTable.replace('T', '')}</div>
                        <div className="text-xs text-white/50">{TABLES.find(t => t.id === selectedTable)?.capacity} Seats • Indoor • Near Window</div>
                      </div>
                    </div>
                    <button onClick={handleNext} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-medium text-white transition-colors">
                      Select Table
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl text-[#F4E5CB] mb-8 text-center">Your Details</h3>
              <form onSubmit={handleComplete} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">Full Name</label>
                    <input name="name" required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">Email</label>
                    <input name="email" required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="you@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-white/70 mb-2">Phone Number</label>
                    <input name="phone" required type="tel" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="+1 234 567 890" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-white/70 mb-2">Special Requests</label>
                    <textarea name="requests" rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="Dietary requirements, anniversary, etc." />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                  <button 
                    type="button"
                    onClick={() => setStep(1)} 
                    className="px-6 py-3 text-white/50 hover:text-white text-sm font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
