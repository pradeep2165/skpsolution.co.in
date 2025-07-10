import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SpeedTest from "./SpeedTester/SpeedTest";
import RadioPlayer from "./FmAudio/RadioPlayer";
import { FaTachometerAlt, FaBroadcastTower, FaYoutube } from "react-icons/fa";
import YouTubeDownloader from "./YTFdownloader/YouTubeDownloader";

function Home() {
  return (
    <>
      <header>
        <h1>SKPSolution</h1>
        <p>We build eCommerce, Property, Downloader, and Radio apps with passion.</p>
        <a href="#contact">
          <button className="cta-button">Get a Free Quote</button>
        </a>
      </header>

      <section>
        <h2>Our Specializations</h2>
        <div className="grid grid-4">
          <div className="card">
            <h3>E-Commerce Apps</h3>
            <p>Online stores with payments, carts, and admin panel.</p>
          </div>
          <div className="card">
            <h3>Property Listings</h3>
            <p>Feature-rich real estate apps with maps and filters.</p>
          </div>
          <div className="card">
            <h3>YouTube Downloader</h3>
            <p>Download YouTube videos or MP3s via clean UI.</p>
          </div>
          <div className="card">
            <h3>Radio Streaming</h3>
            <p>Live radio stations with global audio delivery.</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#f9f9f9" }}>
        <h2>Recent Projects</h2>
        <div className="grid grid-3">
          <Link to="/speedtest" className="card" style={{ textDecoration: "none", color: "inherit" }}>
            <FaTachometerAlt size={48} color="#4a90e2" />
            <h3>Internet Speed Test</h3>
            <p>Check your download, upload, and ping instantly.</p>
          </Link>

          <Link to="/fmRadio" className="card" style={{ textDecoration: "none", color: "inherit" }}>
            <FaBroadcastTower size={48} color="#e85d04" />
            <h3>Live FM Radio</h3>
            <p>Listen to stations like Radio Mirchi and Big FM live.</p>
          </Link>

          <Link className="card" to="/ytf-download" style={{ textDecoration: "none", color: "inherit" }}>
            <FaYoutube size={48} color="#ff0000" />
            <h3>YT Downloader</h3>
            <p>Grab YouTube videos instantly in your chosen format.</p>
          </Link>
        </div>
      </section>

      <section>
        <h2>Client Testimonials</h2>
        <div className="grid grid-2">
          <div className="testimonial">
            "We got our eCommerce platform in record time. Very professional!"
            <small>– Aman, FreshMart</small>
          </div>
          <div className="testimonial">
            "Highly recommend for real estate apps. Clean, fast, and effective."
            <small>– Priya, EstatePro</small>
          </div>
        </div>
      </section>

      <section id="contact" style={{ backgroundColor: "#eef2ff" }}>
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows={5} placeholder="Describe your project..." required />
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>© 2025 skpsolution.co.in All rights reserved.</footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speedtest" element={<SpeedTest />} />
        <Route path="/fmRadio" element={<RadioPlayer />} />
        <Route path="/ytf-download" element={<YouTubeDownloader />} />
      </Routes>
    </Router>
  );
}

export default App;
