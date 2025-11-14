import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import HeroSlideshow from '@/components/sections/hero-slideshow';
import TrustBadges from '@/components/sections/trust-badges';
import CollectionShowcase from '@/components/sections/collection-showcase';
import SignatureCollectionsSection from '@/components/sections/signature-collections';
import CustomDesignsSection from '@/components/sections/custom-designs-section';
import StoreLocatorSection from '@/components/sections/store-locator-section';
import Footer from '@/components/sections/footer';
import GoldPriceTicker from '@/components/GoldPriceTicker';
import AboutSection from '@/components/AboutSection';
import InquiryForm from '@/components/InquiryForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />
      
      <main className="w-full">
        <HeroSlideshow />
        <GoldPriceTicker />
        <TrustBadges />
        <CollectionShowcase />
        <SignatureCollectionsSection />
        <AboutSection />
        <CustomDesignsSection />
        <StoreLocatorSection />
        <InquiryForm />
      </main>
      
      <Footer />
    </div>
  );
}
