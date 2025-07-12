import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SpeedTest from "./SpeedTester/SpeedTest";
import RadioPlayer from "./FmAudio/RadioPlayer";
import { FaTachometerAlt, FaBroadcastTower, FaYoutube, FaBlog, FaCode, FaPaintBrush, FaRegObjectGroup } from "react-icons/fa";
import YouTubeDownloader from "./YTFdownloader/YouTubeDownloader";
import BlogLayout from "./Blog";
import BlogRadioPlayer from "./Blog/BlogRadioPlayer";
import BlogSpeedTestPost from "./Blog/BlogSpeedTestPost";
import BlogCardDesign from "./Blog/BlogCardDesign";
import JSPlayGround from "./JSPlayGround";
import ColorPicker from "./ColorPicker";
import Navbar from "./components/Navbar";
import { HelmetProvider } from "react-helmet-async";
// import Breadcrumbs from "./components/Breadcrumbs";
import TransformPlayground from "./TransformPlayground/TransformPlayground";
import WavesHero from "./components/WavesHero";
function Home() {
  return (
    <>
      <WavesHero />
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
          <Link to="/blog" className="card" style={{ textDecoration: "none", color: "inherit" }}>
            <FaBlog size={48} color="#15cc24ff" />
            <h3>Blog</h3>
            <p>Explore tips, guides, and updates about YouTube video downloads.</p>
          </Link>
          <Link to="/js-paly-ground" className="card" style={{ textDecoration: "none", color: "inherit" }}>
            <FaCode size={48} color="#0033ffff" />
            <div>
              <h3>JS Playground</h3>
              <p>Explore tips, guides, and updates about YouTube video downloads.</p>
            </div>
          </Link>
          <Link to="/color-picker" className="card" style={{ textDecoration: "none", color: "inherit" }} aria-label="Navigate to color picker tool">
            <FaPaintBrush size={48} color="#563ce9ff" />
            <div>
              <h3>Color Picker</h3>
              <p>Choose and experiment with beautiful colors using our intuitive color picker.</p>
            </div>
          </Link>
          <Link to="/transform-playground" className="card" style={{ textDecoration: "none", color: "inherit" }} aria-label="Navigate to CSS transform playground tool">
            <FaRegObjectGroup size={48} color="#5ed1beff" />
            <div>
              <h3>CSS Transform Playground</h3>
              <p>Experiment with transform properties like rotate, scale, skew, and more visually.</p>
            </div>
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
    <HelmetProvider>
      <Router>
        <Navbar />
        {/* <Breadcrumbs /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/speedtest" element={<SpeedTest />} />
          <Route path="/fmRadio" element={<RadioPlayer />} />
          <Route path="/ytf-download" element={<YouTubeDownloader />} />
          <Route path="/js-paly-ground" element={<JSPlayGround />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/transform-playground" element={<TransformPlayground />} />

          <Route path="/blog" element={<BlogLayout />}>
            <Route path="" element={<BlogRadioPlayer />} />
            <Route path="radio-player" element={<BlogRadioPlayer />} />
            <Route path="speed-test" element={<BlogSpeedTestPost />} />
            <Route path="card-design" element={<BlogCardDesign />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
