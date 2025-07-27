import PricingCardOne from "./Cards/PricingCardOne";
import PricingCardTwo from "./Cards/PricingCardTwo";
import SunriseAnimation from "./Cards/SunriseAnimation";
import WaveHero from "./Cards/WaveHero";
import EqualizerLoader from "./Cards/EqualizerLoader";
const BlogPost: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎨 Design, Code & Launch</h1>

      <p style={styles.intro}>In this post, we explore a creative layout involving design, development, and launch cards using basic HTML and CSS. Below is the code and its live preview.</p>

      <PricingCardOne />
      <PricingCardTwo />
      <WaveHero />
      <SunriseAnimation />
      <EqualizerLoader />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    fontFamily: "Segoe UI, sans-serif",
    color: "#eee",
    backgroundColor: "#1e1e1e",
    minHeight: "100vh",
    transition: "all 0.3s",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  intro: {
    marginBottom: "2rem",
    lineHeight: 1.6,
    maxWidth: "700px",
  },
};

export default BlogPost;
