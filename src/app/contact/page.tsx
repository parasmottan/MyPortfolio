"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Clock, Video, ChevronLeft, ChevronRight, ArrowRight, Linkedin, Twitter, Github, CheckCircle } from "lucide-react";
import styles from "./page.module.css";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfDay } from "date-fns";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // Scheduling State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [timezone, setTimezone] = useState("");

  // UI State
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [meetingData, setMeetingData] = useState<{ date: string, time: string, link: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
    // Detect user's timezone automatically
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }
  }, []);

  // Fetch available slots from backend dynamically whenever a date changes
  useEffect(() => {
    if (selectedDate && timezone) {
      const fetchSlots = async () => {
        setIsFetchingSlots(true);
        setSelectedTime(null);
        try {
          const dateStr = format(selectedDate, "yyyy-MM-dd");
          const res = await fetch(`/api/available-slots?date=${dateStr}&timezone=${encodeURIComponent(timezone)}`);
          const data = await res.json();
          if (data.availableSlots) {
            setAvailableSlots(data.availableSlots);
          }
        } catch (error) {
          console.error("Error fetching slots:", error);
        } finally {
          setIsFetchingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [selectedDate, timezone]);

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Generate calendar days
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const calendarDays = [];
  let day = startDate;
  while (day <= endDate) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setErrorMsg("Please select a date and time slot for the meeting above.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/book-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          interest,
          projectDescription,
          selectedDate: format(selectedDate, "yyyy-MM-dd"),
          selectedTime,
          timezone
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        setMeetingData({
          date: format(selectedDate, "MMMM d, yyyy"),
          time: selectedTime,
          link: data.booking.meetingLink
        });
      } else {
        setErrorMsg(data.error || "Failed to schedule the meeting.");
        // If conflict (409 Double Booking Prevention), refresh slot list
        if (res.status === 409) {
          const dateStr = format(selectedDate, "yyyy-MM-dd");
          const freshSlots = await fetch(`/api/available-slots?date=${dateStr}&timezone=${encodeURIComponent(timezone)}`).then(r => r.json());
          if (freshSlots.availableSlots) setAvailableSlots(freshSlots.availableSlots);
          setSelectedTime(null);
        }
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE (Does not modify the UI system, overlays content cleanly)
  if (isSuccess && meetingData) {
    return (
      <main className={styles.main}>
        <div className="container" ref={containerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            <CheckCircle size={72} color="#000" style={{ margin: '0 auto 32px auto' }} />

            <div className={styles.header} style={{ marginBottom: '48px', alignItems: 'center' }}>
              <h1 className={styles.title} style={{ marginBottom: '24px' }}>Meeting <span>Confirmed</span></h1>
              <p className={styles.subtitle} style={{ maxWidth: '100%', textAlign: 'center' }}>
                Your discovery call has been successfully scheduled. A calendar invitation with the Google Meet link has been sent to your email.
              </p>
            </div>

            <div style={{ display: 'inline-block', textAlign: 'left', padding: '0 24px' }}>
              <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 500, display: 'inline-block', width: '140px' }}>Date:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{meetingData.date}</span>
              </div>
              <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 500, display: 'inline-block', width: '140px' }}>Time:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{meetingData.time} ({timezone})</span>
              </div>
              <div style={{ fontSize: '18px' }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 500, display: 'inline-block', width: '140px' }}>Google Meet:</strong>
                <a href={meetingData.link} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'underline', fontWeight: 500 }}>{meetingData.link}</a>
              </div>
            </div>

            <div style={{ marginTop: '64px' }}>
              <button onClick={() => window.location.href = '/'} className={styles.submitBtn} style={{ display: 'inline-flex', width: 'auto', padding: '16px 40px', margin: '0 auto' }}>
                Return Home <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className="container" ref={containerRef}>

        <div className={styles.header}>
          <h1 className={styles.title}>Let's Build <span>Something Great</span></h1>
          <p className={styles.subtitle}>
            Ready to transform your digital presence? Book a discovery call or drop me a line directly. I'm currently accepting new projects for Q4.
          </p>
        </div>

        <div className={styles.bookingContainer}>
          <div className={styles.bookingGrid}>

            {/* LEFT SIDE - MEETING SCHEDULER */}
            <div className={styles.bookingColumn}>
              <div className={styles.authorBlock}>
                <img src="/founder.jpg" alt="Paras Mottan - Design Engineer" className={styles.avatar} style={{ objectFit: 'cover', borderRadius: '50%' }} />
                <div>
                  <span className={styles.authorName}>Paras Mottan</span>
                  <h2 className={styles.callTitle}>Discovery Call</h2>
                </div>
              </div>

              <div className={styles.callDetails}>
                <span><Clock size={16} /> 30 min</span>
                <span><Video size={16} /> Google Meet</span>
              </div>

              <p className={styles.callDesc}>
                A casual chat to discuss your project needs, goals, and how we can work together to achieve them.
              </p>

              <h3 className={styles.dateTimeTitle}>Select a Date & Time</h3>

              <div className={styles.datePickerGrid}>

                <div>
                  <div className={styles.calendarHead}>
                    <span>{format(currentMonth, "MMMM yyyy")}</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <ChevronLeft size={18} cursor="pointer" onClick={handlePrevMonth} />
                      <ChevronRight size={18} cursor="pointer" onClick={handleNextMonth} />
                    </div>
                  </div>
                  <div className={styles.calendarDays}>
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className={styles.calendarNums}>
                    {calendarDays.map((d, i) => {
                      const isCurrentMonth = isSameMonth(d, currentMonth);
                      const isSelected = selectedDate && isSameDay(d, selectedDate);
                      const isPast = isBefore(d, startOfDay(new Date()));

                      const isAvailableDate = isCurrentMonth && !isPast;

                      return (
                        <span
                          key={i}
                          onClick={() => isAvailableDate && setSelectedDate(d)}
                          className={`${styles.calendarNum} ${isSelected ? styles.active : ''}`}
                          style={{
                            color: isSelected ? '#fff' : (isAvailableDate ? 'inherit' : '#ccc'),
                            cursor: isAvailableDate ? 'pointer' : 'default',
                            opacity: isAvailableDate ? 1 : 0.4
                          }}
                        >
                          {format(d, "d")}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <div className={styles.timeSlots}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                    {selectedDate ? format(selectedDate, "EEEE, MMM d") : "Select a date"}
                  </span>

                  {!selectedDate ? (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '16px' }}>Please choose a date to see available times.</div>
                  ) : isFetchingSlots ? (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '16px' }}>Loading available slots...</div>
                  ) : availableSlots.length > 0 ? (
                    availableSlots.map((slot, i) => (
                      <div
                        key={i}
                        className={styles.timeSlot}
                        style={{
                          backgroundColor: selectedTime === slot ? 'var(--text-primary)' : '',
                          color: selectedTime === slot ? '#fff' : '',
                        }}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '16px' }}>No available slots for this date.</div>
                  )}
                </div>

              </div>
            </div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <div className={styles.bookingColumn}>
              <h2 className={styles.formTitle}>Send a message</h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className={styles.inputGroup}>
                  <input type="text" placeholder="Your Name" className={styles.inputField} value={name} onChange={e => setName(e.target.value)} required />
                  <span className={styles.focusLine}></span>
                </div>

                <div className={styles.inputGroup}>
                  <input type="email" placeholder="Email Address" className={styles.inputField} value={email} onChange={e => setEmail(e.target.value)} required />
                  <span className={styles.focusLine}></span>
                </div>

                <div className={styles.inputGroup}>
                  <input type="text" placeholder="What are you interested in?" className={styles.inputField} value={interest} onChange={e => setInterest(e.target.value)} />
                  <span className={styles.focusLine}></span>
                </div>

                <div className={styles.inputGroup} style={{ flexGrow: 1, marginBottom: '40px' }}>
                  <textarea placeholder="Tell me about your project" className={styles.inputField} style={{ resize: 'vertical', minHeight: '120px', height: '100%' }} value={projectDescription} onChange={e => setProjectDescription(e.target.value)} required></textarea>
                  <span className={styles.focusLine}></span>
                </div>

                {errorMsg && <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>{errorMsg}</div>}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: 'auto' }}>
                  <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                  <span className={styles.btnArrowIcon}>
                    {isSubmitting ? <span className={styles.spinner} /> : <ArrowRight size={20} />}
                  </span>
                </button>
              </form>

              <div className={styles.contactFooter}>
                <span className={styles.contactLabel}>DIRECT CONTACT</span>
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className={styles.emailLink}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a>

                <span className={styles.contactLabel}>SOCIALS</span>
                <div className={styles.socials}>
                  <a href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN} target="_blank" rel="noreferrer" className={styles.socialIcon}><Linkedin size={18} /></a>
                  <a href={process.env.NEXT_PUBLIC_SOCIAL_TWITTER} target="_blank" rel="noreferrer" className={styles.socialIcon}><Twitter size={18} /></a>
                  <a href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB} target="_blank" rel="noreferrer" className={styles.socialIcon}><Github size={18} /></a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
