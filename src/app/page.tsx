import Navbar from '../components/Navbar';
import DownloaderSection from '../components/DownloaderSection';
import PlatformsGrid from '../components/PlatformsGrid';
import HowItWorks from '../components/HowItWorks';
import FeaturesSection from '../components/FeaturesSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="atelier-page-wrapper" id="page-wrapper">

      <Navbar />

      <DownloaderSection />

      <PlatformsGrid />

      <HowItWorks />

      <FeaturesSection />

      <FAQSection />

      <Footer />
    </main>
  );
}
