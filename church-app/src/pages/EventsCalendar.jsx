import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CALENDAR_ID =
  "da92ccf9ba47b4363891a93b0a37f94154e60331f03099a07cd9c449f5c7e5c8@group.calendar.google.com";
const googleCalendarApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getEventDateKey(event) {
  const raw = event.start?.dateTime || event.start?.date;
  if (!raw) return null;
  const d = new Date(raw);
  return dateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

function getEventTime(event) {
  if (!event.start?.dateTime) return "All Day";
  return new Date(event.start.dateTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function buildMonthMatrix(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = 0; i < startOffset; i++) {
    const day = daysInPrevMonth - startOffset + 1 + i;
    cells.push({ date: new Date(year, month - 1, day), inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(year, month, day), inMonth: true });
  }

  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function EventsCalendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [eventsByDate, setEventsByDate] = useState({});
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const weeks = buildMonthMatrix(year, month);

  useEffect(() => {
    setSelectedDay(null);

    if (!googleCalendarApiKey) {
      setStatus("error");
      return;
    }

    const rangeStart = weeks[0][0].date;
    const rangeEnd = weeks[weeks.length - 1][6].date;
    const timeMax = new Date(rangeEnd);
    timeMax.setDate(timeMax.getDate() + 1);

    const params = new URLSearchParams({
      key: googleCalendarApiKey,
      timeMin: rangeStart.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "250",
    });

    const loadEvents = async () => {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            CALENDAR_ID
          )}/events?${params}`
        );
        if (!res.ok) throw new Error("Could not load calendar events");

        const data = await res.json();
        const grouped = {};
        (data.items || []).forEach((event) => {
          const key = getEventDateKey(event);
          if (!key) return;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(event);
        });

        setEventsByDate(grouped);
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    loadEvents();
  }, [year, month]);

  const goToPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToToday = () => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));

  const selectedEvents = selectedDay
    ? eventsByDate[dateKey(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate())] || []
    : [];

  return (
    <div className="App">
      <header className="page-hero">
        <Navbar />
        <div className="page-hero-text">
          <span className="eyebrow">Resources</span>
          <h1>Events Calendar</h1>
        </div>
      </header>

      <section className="contact-section">
        <div className="calendar-wrapper reveal">
          <div className="calendar-header">
            <div className="calendar-header-top">
              <h2>{MONTH_LABELS[month]} {year}</h2>
              <div className="calendar-nav">
                <button onClick={goToPrevMonth} aria-label="Previous month">‹</button>
                <button className="calendar-today-btn" onClick={goToToday}>Today</button>
                <button onClick={goToNextMonth} aria-label="Next month">›</button>
              </div>
            </div>
          </div>

          {status === "error" && (
            <p className="calendar-status">
              We couldn't load events right now. Please check back soon.
            </p>
          )}

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {WEEKDAY_LABELS.map((label) => (
                <div key={label} className="calendar-weekday">{label}</div>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div className="calendar-week" key={wi}>
                {week.map(({ date, inMonth }, di) => {
                  const key = dateKey(date.getFullYear(), date.getMonth(), date.getDate());
                  const dayEvents = eventsByDate[key] || [];
                  const isToday = isSameDay(date, today);
                  const isSelected = selectedDay && isSameDay(date, selectedDay);

                  return (
                    <div
                        key={di}
                        className={`calendar-day ${inMonth ? "" : "calendar-day-muted"} ${isToday ? "calendar-day-today" : ""}`}
                        >
                        <span className="calendar-day-number">{date.getDate()}</span>

                        {dayEvents.length > 0 && (
                            <div className="calendar-day-events">
                            {dayEvents.slice(0, 3).map((event) => (
                                <span className="calendar-day-event-title" key={event.id}>
                                {event.summary}
                                </span>
                            ))}
                            {dayEvents.length > 3 && (
                                <span className="calendar-day-event-more">
                                +{dayEvents.length - 3} more
                                </span>
                            )}
                            </div>
                        )}
                        </div>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EventsCalendar;