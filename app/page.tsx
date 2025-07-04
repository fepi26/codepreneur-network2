import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhiteContentBlock } from "@/components/white-content-block"
import { PartnersSection } from "@/components/partners-section"
import { GrowthSection } from "@/components/growth-section"
import { FAQSection } from "@/components/faq-section"
import { BlogSection } from "@/components/blog-section"
import { FooterCTA } from "@/components/footer-cta"
import { MainFooter } from "@/components/main-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <HeroSection />
      <div className="space-y-8 md:space-y-20">
        <WhiteContentBlock />
        <PartnersSection />
        <GrowthSection />
        <FAQSection />
        <BlogSection />
        <FooterCTA />
      </div>
      <MainFooter />
    </main>
  )
}

