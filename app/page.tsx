import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFormSection />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BOX la caisse mobile",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Android, iOS",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "XOF",
            },
            "description":
              "Box permet aux entrepreneurs, commerçants, artisans, étudiants et particuliers d'épargner facilement et en toute sécurité.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1000",
            },
            "author": {
              "@type": "Organization",
              "name": "Babilon Group",
              "url": "https://www.babilonbg.net",
            },
          }),
        }}
      />
    </main>
  )
}
