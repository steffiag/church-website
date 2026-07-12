import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactLocation from "./pages/ContactLocation";
import ContactInquiries from "./pages/ContactInquiries";
import EventsCalendar from "./pages/EventsCalendar";
import About from "./pages/About";
import Programs from "./pages/Programs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact/location" element={<ContactLocation />} />
      <Route path="/contact/inquiries" element={<ContactInquiries />} />
      <Route path="/resources/calendar" element={<EventsCalendar />} />
      <Route path="/about" element={<About />} />
      <Route path="/programs" element={<Programs />} />
    </Routes>
  );
}

export default App;