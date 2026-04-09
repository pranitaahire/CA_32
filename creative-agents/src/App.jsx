import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: {
      home: "Home", work: "Our Work", features: "Features",
      benefits: "Why Us", contact: "Contact", demo: "Book a Demo",
    },
    hero: {
      badge: "Premium Restaurant Marketing",
      h1a: "Turn Your Dishes Into",
      h1b: "Scroll-Stopping",
      h1c: "Creatives",
      sub: "Professional marketing visuals designed for restaurants, cafes and pubs.",
      cta1: "Book a Demo",
      cta2: "View Creative Gallery",
    },
    proof: {
      title: "Helping Restaurants Stand Out Online",
      sub: "Trusted by leading dining brands across the country",
      testimonials: [
        { q: '"Our food marketing completely changed after working with Creative Agents. The visuals are absolutely stunning."', n: "Arjun Mehta", r: "The Spice Garden, Mumbai" },
        { q: '"We went from zero engagement to thousands of shares. Premium quality every single time."', n: "Sofia Rodrigues", r: "Casa Bella, Goa" },
        { q: '"The creatives look better than anything our in-house team produced. Worth every rupee."', n: "Rahul Khanna", r: "Urban Brew Café, Delhi" },
      ],
    },
    showcase: {
      title: "Creative Marketing That Gets Attention",
      sub: "Every visual crafted to make your brand irresistible.",
    },
    features: {
      title: "Built for Modern Restaurant Marketing",
      sub: "Everything you need to dominate your local market.",
      items: [
        { t: "Social Media Creatives", d: "Platform-optimised visuals built for Instagram, Facebook & more." },
        { t: "Food Promotion Posters", d: "Eye-catching posters that drive footfall and online orders." },
        { t: "Digital Menu Visuals", d: "Beautiful, branded menus that elevate the dining experience." },
        { t: "Campaign Creatives", d: "Full-funnel campaign assets for launches and events." },
        { t: "Seasonal Promotions", d: "On-brand creatives for every season, occasion and holiday." },
        { t: "Offer & Discount Ads", d: "High-converting ad creatives that maximise your ROI." },
      ],
    },
    benefits: {
      title: "Why Restaurants Choose Us",
      sub: "The creative edge that sets top brands apart.",
      items: [
        { t: "Increase Online Engagement", d: "Captivating visuals that stop the scroll and drive real action." },
        { t: "Consistent Brand Visuals", d: "A coherent brand identity across every platform and campaign." },
        { t: "Professional Quality", d: "Studio-grade creatives delivered without the agency price tag." },
        { t: "Perfect for Instagram & Ads", d: "Formats optimised for every placement — stories, reels, feed & more." },
      ],
    },
    cta: {
      title: "Ready To Upgrade Your Restaurant Marketing?",
      sub: "Join hundreds of restaurants already growing with Creative Agents.",
      b1: "Book a Demo", b2: "Contact Us",
    },
    form: {
      title: "Let's Talk About Your Brand",
      sub: "Fill in your details and we'll reach out within 24 hours.",
      f1: "Restaurant Name", f2: "Contact Person",
      f3: "Phone Number", f4: "City", f5: "Your message...",
      btn: "Request Demo →",
      ok: "Thank you! We'll be in touch within 24 hours. 🎉",
    },
    footer: {
      tag: "Premium marketing visuals for restaurants, cafes and pubs.",
      company: "Company", services: "Services", contact: "Contact",
      rights: "© 2025 Creative Agents. All rights reserved.",
    },
  },

  hi: {
    nav: {
      home: "होम", work: "हमारा काम", features: "सुविधाएं",
      benefits: "हमें क्यों", contact: "संपर्क", demo: "डेमो बुक करें",
    },
    hero: {
      badge: "प्रीमियम रेस्तरां मार्केटिंग",
      h1a: "अपने व्यंजनों को बनाएं",
      h1b: "स्क्रॉल-स्टॉपिंग",
      h1c: "क्रिएटिव",
      sub: "रेस्तरां, कैफे और पब के लिए पेशेवर मार्केटिंग विज़ुअल्स।",
      cta1: "डेमो बुक करें", cta2: "गैलरी देखें",
    },
    proof: {
      title: "रेस्तरां को ऑनलाइन अलग बनाना",
      sub: "देश भर के प्रमुख डाइनिंग ब्रांड्स का विश्वास",
      testimonials: [
        { q: '"इस प्लेटफॉर्म के साथ काम करने के बाद हमारी फूड मार्केटिंग पूरी तरह बदल गई।"', n: "अर्जुन मेहता", r: "द स्पाइस गार्डन, मुंबई" },
        { q: '"हम जीरो एंगेजमेंट से हजारों शेयर तक पहुंचे। बिल्कुल प्रीमियम।"', n: "सोफिया रोड्रिग्स", r: "कासा बेला, गोवा" },
        { q: '"क्रिएटिव हमारी इन-हाउस टीम से बेहतर दिखते हैं। हर रुपये का मूल्य।"', n: "राहुल खन्ना", r: "अर्बन ब्रू कैफे, दिल्ली" },
      ],
    },
    showcase: {
      title: "क्रिएटिव मार्केटिंग जो ध्यान खींचे",
      sub: "हर विज़ुअल आपके ब्रांड को अप्रतिरोध्य बनाने के लिए।",
    },
    features: {
      title: "आधुनिक रेस्तरां मार्केटिंग के लिए",
      sub: "अपने स्थानीय बाजार में छाने के लिए सब कुछ।",
      items: [
        { t: "सोशल मीडिया क्रिएटिव", d: "इंस्टाग्राम, फेसबुक के लिए ऑप्टिमाइज़ड विज़ुअल्स।" },
        { t: "फूड प्रमोशन पोस्टर", d: "आकर्षक पोस्टर जो ऑर्डर बढ़ाते हैं।" },
        { t: "डिजिटल मेनू विज़ुअल्स", d: "ब्रांडेड मेनू जो डाइनिंग अनुभव को बेहतर बनाते हैं।" },
        { t: "कैम्पेन क्रिएटिव", d: "लॉन्च और इवेंट के लिए पूर्ण कैम्पेन एसेट्स।" },
        { t: "सीज़नल प्रमोशन", d: "हर मौसम और त्योहार के लिए ब्रांडेड क्रिएटिव।" },
        { t: "ऑफर और डिस्काउंट एड", d: "उच्च-कन्वर्टिंग एड क्रिएटिव।" },
      ],
    },
    benefits: {
      title: "रेस्तरां हमें क्यों चुनते हैं",
      sub: "वो क्रिएटिव एज जो टॉप ब्रांड्स को अलग बनाती है।",
      items: [
        { t: "ऑनलाइन एंगेजमेंट बढ़ाएं", d: "ऐसे विज़ुअल्स जो स्क्रॉल रोकें और एक्शन दिलाएं।" },
        { t: "कंसिस्टेंट ब्रांड विज़ुअल्स", d: "हर प्लेटफॉर्म पर एक समान ब्रांड पहचान।" },
        { t: "प्रोफेशनल क्वालिटी", d: "स्टूडियो-ग्रेड क्रिएटिव, एजेंसी की कीमत के बिना।" },
        { t: "इंस्टाग्राम के लिए परफेक्ट", d: "हर प्लेसमेंट के लिए ऑप्टिमाइज़ड फॉर्मेट।" },
      ],
    },
    cta: {
      title: "अपनी रेस्तरां मार्केटिंग अपग्रेड करने के लिए तैयार?",
      sub: "सैकड़ों रेस्तरां पहले से Creative Agents के साथ बढ़ रहे हैं।",
      b1: "डेमो बुक करें", b2: "संपर्क करें",
    },
    form: {
      title: "अपने ब्रांड के बारे में बात करें",
      sub: "अपनी जानकारी भरें और हम 24 घंटे में संपर्क करेंगे।",
      f1: "रेस्तरां का नाम", f2: "संपर्क व्यक्ति",
      f3: "फोन नंबर", f4: "शहर", f5: "संदेश...",
      btn: "डेमो अनुरोध करें →",
      ok: "धन्यवाद! हम 24 घंटे में संपर्क करेंगे। 🎉",
    },
    footer: {
      tag: "रेस्तरां, कैफे और पब के लिए प्रीमियम मार्केटिंग विज़ुअल्स।",
      company: "कंपनी", services: "सेवाएं", contact: "संपर्क",
      rights: "© 2025 Creative Agents. सर्वाधिकार सुरक्षित।",
    },
  },

  mr: {
    nav: {
      home: "मुखपृष्ठ", work: "आमचे काम", features: "वैशिष्ट्ये",
      benefits: "आम्हाला का", contact: "संपर्क", demo: "डेमो बुक करा",
    },
    hero: {
      badge: "प्रीमियम रेस्टॉरंट मार्केटिंग",
      h1a: "तुमच्या पदार्थांना बनवा",
      h1b: "स्क्रॉल-स्टॉपिंग",
      h1c: "क्रिएटिव्ह",
      sub: "रेस्टॉरंट, कॅफे आणि पब साठी व्यावसायिक मार्केटिंग व्हिज्युअल्स।",
      cta1: "डेमो बुक करा", cta2: "गॅलरी पहा",
    },
    proof: {
      title: "रेस्टॉरंटना ऑनलाइन वेगळे दाखवणे",
      sub: "देशभरातील आघाडीच्या डायनिंग ब्रँड्सचा विश्वास",
      testimonials: [
        { q: '"या प्लॅटफॉर्मसोबत काम केल्यानंतर आमची मार्केटिंग पूर्णपणे बदलली।"', n: "अर्जुन मेहता", r: "द स्पाइस गार्डन, मुंबई" },
        { q: '"शून्य एंगेजमेंटवरून हजारो शेअर्सपर्यंत — खरोखरच प्रीमियम।"', n: "सोफिया रॉड्रिगेस", r: "कासा बेला, गोवा" },
        { q: '"क्रिएटिव्ह आमच्या इन-हाउस टीमपेक्षा चांगले दिसतात।"', n: "राहुल खन्ना", r: "अर्बन ब्रू कॅफे, दिल्ली" },
      ],
    },
    showcase: {
      title: "क्रिएटिव्ह मार्केटिंग जे लक्ष वेधून घेते",
      sub: "प्रत्येक व्हिज्युअल तुमचा ब्रँड अप्रतिम बनवण्यासाठी।",
    },
    features: {
      title: "आधुनिक रेस्टॉरंट मार्केटिंगसाठी",
      sub: "तुमच्या स्थानिक बाजारात वर्चस्व गाजवण्यासाठी सर्व काही।",
      items: [
        { t: "सोशल मीडिया क्रिएटिव्ह", d: "इन्स्टाग्राम, फेसबुकसाठी ऑप्टिमाइज्ड व्हिज्युअल्स।" },
        { t: "फूड प्रमोशन पोस्टर", d: "आकर्षक पोस्टर जे ऑर्डर वाढवतात।" },
        { t: "डिजिटल मेनू व्हिज्युअल्स", d: "ब्रँडेड मेनू जे डायनिंग अनुभव उंचावतात।" },
        { t: "कॅम्पेन क्रिएटिव्ह", d: "लाँच आणि इव्हेंटसाठी पूर्ण कॅम्पेन एसेट्स।" },
        { t: "सीझनल प्रमोशन", d: "प्रत्येक हंगाम आणि सणासाठी ब्रँडेड क्रिएटिव्ह।" },
        { t: "ऑफर आणि डिस्काउंट एड", d: "उच्च-कन्व्हर्टिंग एड क्रिएटिव्ह।" },
      ],
    },
    benefits: {
      title: "रेस्टॉरंट आम्हाला का निवडतात",
      sub: "तो क्रिएटिव्ह एज जो टॉप ब्रँड्सना वेगळे ठरवतो।",
      items: [
        { t: "ऑनलाइन एंगेजमेंट वाढवा", d: "व्हिज्युअल्स जे स्क्रोल थांबवतात।" },
        { t: "सातत्यपूर्ण ब्रँड व्हिज्युअल्स", d: "प्रत्येक प्लॅटफॉर्मवर एकसंध ब्रँड ओळख।" },
        { t: "व्यावसायिक दर्जा", d: "स्टुडिओ-ग्रेड क्रिएटिव्ह, एजन्सी किमतीशिवाय।" },
        { t: "इन्स्टाग्रामसाठी परफेक्ट", d: "प्रत्येक प्लेसमेंटसाठी ऑप्टिमाइज्ड फॉर्मेट्स।" },
      ],
    },
    cta: {
      title: "तुमची रेस्टॉरंट मार्केटिंग अपग्रेड करण्यासाठी तयार?",
      sub: "शेकडो रेस्टॉरंट आधीपासून Creative Agents सोबत वाढत आहेत।",
      b1: "डेमो बुक करा", b2: "संपर्क करा",
    },
    form: {
      title: "तुमच्या ब्रँडबद्दल बोलूया",
      sub: "तुमचे तपशील भरा आणि आम्ही 24 तासांत संपर्क करू।",
      f1: "रेस्टॉरंटचे नाव", f2: "संपर्क व्यक्ती",
      f3: "फोन नंबर", f4: "शहर", f5: "संदेश...",
      btn: "डेमो विनंती करा →",
      ok: "धन्यवाद! आम्ही 24 तासांत संपर्क करू। 🎉",
    },
    footer: {
      tag: "रेस्टॉरंट, कॅफे आणि पब साठी प्रीमियम मार्केटिंग व्हिज्युअल्स।",
      company: "कंपनी", services: "सेवा", contact: "संपर्क",
      rights: "© 2025 Creative Agents. सर्व हक्क राखीव।",
    },
  },
};

const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "hi", label: "हि", name: "हिन्दी" },
  { code: "mr", label: "म", name: "मराठी" },
];

const SHOWCASE = [
  { e: "🍔", l: "Burger Drop", tag: "Instagram Ad", ac: "#FF6A00" },
  { e: "🍕", l: "Pizza Night", tag: "Story Creative", ac: "#EF4444" },
  { e: "☕", l: "Café Morning", tag: "Promotion Poster", ac: "#F59E0B" },
  { e: "🍹", l: "Cocktail Hour", tag: "Bar Campaign", ac: "#8B5CF6" },
  { e: "🍰", l: "Dessert Special", tag: "Feed Creative", ac: "#EC4899" },
];

const LOGOS = ["The Spice Garden", "Casa Bella", "Urban Brew", "Ember & Oak", "The Golden Fork", "Café Noir", "Bistro 42", "The Pearl"];

const FEAT_ICONS = ["📱", "🪧", "📋", "🎯", "🌸", "💥"];
const BEN_ICONS = ["🚀", "✨", "🏆", "📸"];

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function CALogo({ dark }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: "linear-gradient(135deg, #4DAAEE, #F5A623)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 18, color: "#fff", fontFamily: "Georgia, serif",
        flexShrink: 0,
      }}>CA</div>
      <div style={{ lineHeight: 1 }}>
        <span style={{ fontWeight: 800, fontSize: 18, color: dark ? "#fff" : "#111" }}>Creative</span>
        <span style={{ fontWeight: 400, fontSize: 18, color: dark ? "#aaa" : "#666" }}>Agents</span>
      </div>
    </div>
  );
}

// ─── GRAD TEXT ────────────────────────────────────────────────────────────────
function Grad({ children }) {
  return (
    <span style={{
      background: "linear-gradient(90deg, #FF6A00, #FF9A3C)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    }}>{children}</span>
  );
}

// ─── SECTION FADE ─────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, id, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id} ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >{children}</motion.section>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark, lang, setLang, t, activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(id);
    setMobileOpen(false);
  };

  const TABS = [
    { id: "hero", label: t.nav.home },
    { id: "showcase", label: t.nav.work },
    { id: "features", label: t.nav.features },
    { id: "benefits", label: t.nav.benefits },
    { id: "contact", label: t.nav.contact },
  ];

  const bg = dark
    ? scrolled ? "rgba(11,11,11,0.96)" : "transparent"
    : scrolled ? "rgba(255,255,255,0.96)" : "transparent";
  const border = scrolled ? `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` : "none";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: bg, backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: border, transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", height: 68, gap: 16,
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("hero")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <CALogo dark={dark} />
        </button>

        {/* Desktop Tabs */}
        <div className="hide-mobile" style={{ display: "flex", gap: 2, marginLeft: 16 }}>
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px 14px", fontSize: 14, fontWeight: 500,
                color: activeTab === id ? "#FF9A3C" : (dark ? "#aaa" : "#666"),
                borderBottom: activeTab === id ? "2px solid #FF6A00" : "2px solid transparent",
                transition: "all 0.2s", fontFamily: "inherit",
              }}
            >{label}</button>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
          {/* Language */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{
              background: dark ? "#1a1a1a" : "#eee",
              border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              borderRadius: 8, padding: "7px 13px", cursor: "pointer",
              color: dark ? "#ccc" : "#555", fontSize: 12, fontWeight: 700,
              fontFamily: "inherit",
            }}>
              {LANGS.find(l => l.code === lang)?.label} ▾
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    background: dark ? "#1c1c1c" : "#fff",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    borderRadius: 12, overflow: "hidden", zIndex: 300, minWidth: 130,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                  }}
                >
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      style={{
                        display: "block", width: "100%", padding: "11px 18px",
                        background: lang === l.code ? (dark ? "#2a2a2a" : "#f5f5f5") : "none",
                        border: "none", cursor: "pointer", textAlign: "left",
                        color: dark ? "#ddd" : "#333", fontSize: 13,
                        fontWeight: lang === l.code ? 700 : 400, fontFamily: "inherit",
                        whiteSpace: "nowrap",
                      }}
                    >{l.label} — {l.name}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme */}
          <button onClick={() => setDark(!dark)} style={{
            background: dark ? "#1a1a1a" : "#eee",
            border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 16,
          }}>{dark ? "☀️" : "🌙"}</button>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("contact")}
            className="hide-mobile"
            style={{
              background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
              border: "none", borderRadius: 10, padding: "10px 22px",
              color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >{t.nav.demo}</motion.button>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
              borderRadius: 8, padding: "7px 10px", cursor: "pointer",
              color: dark ? "#fff" : "#111", fontSize: 18,
            }}
          >{mobileOpen ? "✕" : "☰"}</button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              background: dark ? "#0d0d0d" : "#fafafa",
              borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 2 }}>
              {TABS.map(({ id, label }) => (
                <button key={id} onClick={() => scrollTo(id)} style={{
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  padding: "14px 0", fontSize: 16, fontWeight: 500,
                  color: activeTab === id ? "#FF9A3C" : (dark ? "#ddd" : "#333"),
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                  fontFamily: "inherit",
                }}>{label}</button>
              ))}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("contact")}
                style={{
                  marginTop: 16, background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
                  border: "none", borderRadius: 12, padding: "15px",
                  color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >{t.nav.demo}</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ t, dark, scrollTo }) {
  const floatItems = [
    { e: "🍔", l: "Burger Drop", x: -250, y: -90, delay: 0 },
    { e: "☕", l: "Café Morning", x: 250, y: -110, delay: 0.2 },
    { e: "🍕", l: "Pizza Night", x: -220, y: 110, delay: 0.4 },
    { e: "🍹", l: "Cocktail Hour", x: 230, y: 100, delay: 0.6 },
  ];

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden", paddingTop: 80,
      background: dark ? "#0B0B0B" : "#FAFAFA",
    }}>
      {/* BG effects */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,106,0,0.12) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: dark ? 0.04 : 0.05 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={dark ? "#fff" : "#000"} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px", width: "100%", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: dark ? "rgba(255,106,0,0.1)" : "rgba(255,106,0,0.08)",
              border: "1px solid rgba(255,106,0,0.3)",
              borderRadius: 100, padding: "8px 20px", marginBottom: 30,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6A00" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#FF9A3C", letterSpacing: "0.08em" }}>{t.hero.badge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(34px, 6.5vw, 80px)", fontWeight: 900, lineHeight: 1.1,
              color: dark ? "#fff" : "#111", maxWidth: 920, marginBottom: 22,
              fontFamily: "Georgia, serif", letterSpacing: "-0.02em",
            }}
          >
            {t.hero.h1a} <Grad>{t.hero.h1b}</Grad> {t.hero.h1c}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontSize: 18, color: dark ? "#888" : "#666", maxWidth: 560, lineHeight: 1.7, marginBottom: 38 }}
          >{t.hero.sub}</motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 72 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              style={{
                background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
                border: "none", borderRadius: 14, padding: "16px 38px",
                color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
                boxShadow: "0 8px 32px rgba(255,106,0,0.35)", fontFamily: "inherit",
              }}
            >{t.hero.cta1}</motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("showcase")}
              style={{
                background: "none",
                border: `1px solid ${dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"}`,
                borderRadius: 14, padding: "16px 38px",
                color: dark ? "#ddd" : "#333", fontWeight: 700, fontSize: 16,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >{t.hero.cta2} →</motion.button>
          </motion.div>

          {/* Floating Cards */}
          <div className="float-cards" style={{
            position: "relative", height: 260, width: "100%", maxWidth: 720,
          }}>
            {floatItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                  opacity: { delay: 0.55 + item.delay },
                  scale: { delay: 0.55 + item.delay },
                  y: { duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                }}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px))`,
                }}
              >
                <div style={{
                  background: dark ? "#1a1a1a" : "#f0f0f0",
                  borderRadius: 14, padding: "12px 16px",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  display: "flex", alignItems: "center", gap: 10,
                  boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.1)",
                  minWidth: 155,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,106,0,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{item.e}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: dark ? "#fff" : "#111" }}>{item.l}</div>
                    <div style={{ fontSize: 11, color: dark ? "#666" : "#888", marginTop: 2 }}>Live ✓</div>
                  </div>
                  <div style={{
                    marginLeft: "auto", width: 7, height: 7, borderRadius: "50%",
                    background: "#22c55e", boxShadow: "0 0 6px #22c55e",
                  }} />
                </div>
              </motion.div>
            ))}
            {/* Center orb */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, boxShadow: "0 0 40px rgba(255,106,0,0.45)",
              }}
            >🎨</motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF ─────────────────────────────────────────────────────────────
function Proof({ t, dark }) {
  const c = dark ? "#141414" : "#fff";
  const border = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <FadeIn id="proof" style={{
      padding: "90px 24px",
      background: dark ? "#0d0d0d" : "#f5f5f5",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900,
            color: dark ? "#fff" : "#111", fontFamily: "Georgia, serif", marginBottom: 14,
          }}>{t.proof.title}</h2>
          <p style={{ fontSize: 17, color: dark ? "#777" : "#888" }}>{t.proof.sub}</p>
        </div>

        {/* Scrolling logos */}
        <div style={{
          overflow: "hidden", marginBottom: 56,
          maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}>
          <motion.div
            animate={{ x: [0, -960] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ display: "flex", gap: 20, width: "max-content" }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} style={{
                padding: "10px 24px", borderRadius: 8,
                background: dark ? "#1a1a1a" : "#e5e5e5",
                border: `1px solid ${border}`,
                fontWeight: 600, fontSize: 13,
                color: dark ? "#555" : "#999", whiteSpace: "nowrap",
              }}>{logo}</div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22,
        }}>
          {t.proof.testimonials.map(({ q, n, r }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              style={{ background: c, borderRadius: 20, padding: "28px", border: `1px solid ${border}` }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#FF9A3C", fontSize: 15 }}>★</span>)}
              </div>
              <p style={{
                fontSize: 14, color: dark ? "#aaa" : "#666",
                lineHeight: 1.75, marginBottom: 20, fontStyle: "italic",
              }}>{q}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 16, color: "#fff",
                }}>{n[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: dark ? "#fff" : "#111" }}>{n}</div>
                  <div style={{ fontSize: 12, color: dark ? "#666" : "#888", marginTop: 2 }}>{r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── SHOWCASE ─────────────────────────────────────────────────────────────────
function Showcase({ t, dark }) {
  const border = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const card = dark ? "#141414" : "#fff";

  return (
    <FadeIn id="showcase" style={{ padding: "90px 24px", background: dark ? "#0B0B0B" : "#FAFAFA" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900,
            color: dark ? "#fff" : "#111", fontFamily: "Georgia, serif", marginBottom: 14,
          }}>{t.showcase.title}</h2>
          <p style={{ fontSize: 17, color: dark ? "#777" : "#888" }}>{t.showcase.sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
          {SHOWCASE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -7 }}
              style={{
                background: card, borderRadius: 18, overflow: "hidden",
                border: `1px solid ${border}`, cursor: "pointer",
              }}
            >
              <div style={{
                height: 180, display: "flex", alignItems: "center", justifyContent: "center",
                background: `radial-gradient(circle, ${item.ac}28 0%, transparent 70%)`,
                fontSize: 60,
              }}>{item.e}</div>
              <div style={{ padding: "14px 16px", borderTop: `1px solid ${border}` }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: dark ? "#fff" : "#111" }}>{item.l}</div>
                <div style={{ fontSize: 11, marginTop: 4, color: item.ac, fontWeight: 600 }}>{item.tag}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
function Features({ t, dark }) {
  const border = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const card = dark ? "#141414" : "#fff";

  return (
    <FadeIn id="features" style={{ padding: "90px 24px", background: dark ? "#0d0d0d" : "#f5f5f5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900,
            color: dark ? "#fff" : "#111", fontFamily: "Georgia, serif", marginBottom: 14,
          }}>{t.features.title}</h2>
          <p style={{ fontSize: 17, color: dark ? "#777" : "#888" }}>{t.features.sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 22 }}>
          {t.features.items.map(({ t: ft, d }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -5 }}
              style={{
                background: card, borderRadius: 18, padding: "28px 24px",
                border: `1px solid ${border}`, position: "relative", overflow: "hidden",
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 13,
                background: "linear-gradient(135deg, rgba(255,106,0,0.14), rgba(255,154,60,0.14))",
                border: "1px solid rgba(255,106,0,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 18,
              }}>{FEAT_ICONS[i]}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: dark ? "#fff" : "#111", marginBottom: 8 }}>{ft}</div>
              <div style={{ fontSize: 13, color: dark ? "#777" : "#666", lineHeight: 1.65 }}>{d}</div>
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 70, height: 70,
                background: "radial-gradient(circle, rgba(255,106,0,0.07) 0%, transparent 70%)",
                borderRadius: "0 18px 0 70px",
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
function Benefits({ t, dark }) {
  const border = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  return (
    <FadeIn id="benefits" style={{ padding: "90px 24px", background: dark ? "#0B0B0B" : "#FAFAFA" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900,
            color: dark ? "#fff" : "#111", fontFamily: "Georgia, serif", marginBottom: 14,
          }}>{t.benefits.title}</h2>
          <p style={{ fontSize: 17, color: dark ? "#777" : "#888" }}>{t.benefits.sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))", gap: 20 }}>
          {t.benefits.items.map(({ t: bt, d }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: "flex", gap: 18, alignItems: "flex-start",
                padding: "24px",
                background: dark ? "#111" : "#f0f0f0",
                borderRadius: 16, border: `1px solid ${border}`,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 13, flexShrink: 0,
                background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>{BEN_ICONS[i]}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: dark ? "#fff" : "#111", marginBottom: 7 }}>{bt}</div>
                <div style={{ fontSize: 13, color: dark ? "#666" : "#777", lineHeight: 1.65 }}>{d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CTABanner({ t, dark, scrollTo }) {
  return (
    <FadeIn style={{ padding: "20px 24px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
          borderRadius: 26, padding: "68px 44px",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.14) 0%, transparent 60%)",
          }} />
          <div style={{ position: "relative" }}>
            <h2 style={{
              fontSize: "clamp(22px, 4vw, 46px)", fontWeight: 900,
              color: "#fff", fontFamily: "Georgia, serif", marginBottom: 16, lineHeight: 1.2,
            }}>{t.cta.title}</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.82)", marginBottom: 38 }}>{t.cta.sub}</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("contact")}
                style={{
                  background: "#fff", border: "none", borderRadius: 12,
                  padding: "15px 36px", color: "#FF6A00",
                  fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "inherit",
                }}
              >{t.cta.b1}</motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("contact")}
                style={{
                  background: "none", border: "2px solid rgba(255,255,255,0.65)",
                  borderRadius: 12, padding: "15px 36px",
                  color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "inherit",
                }}
              >{t.cta.b2}</motion.button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
function Contact({ t, dark }) {
  const [form, setForm] = useState({ name: "", person: "", phone: "", city: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: dark ? "#111" : "#f0f0f0",
    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
    borderRadius: 10, color: dark ? "#fff" : "#111",
    fontSize: 14, outline: "none", fontFamily: "inherit",
  };

  return (
    <FadeIn id="contact" style={{ padding: "90px 24px", background: dark ? "#0d0d0d" : "#f5f5f5" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900,
            color: dark ? "#fff" : "#111", fontFamily: "Georgia, serif", marginBottom: 14,
          }}>{t.form.title}</h2>
          <p style={{ fontSize: 17, color: dark ? "#777" : "#888" }}>{t.form.sub}</p>
        </div>

        <div style={{
          background: dark ? "#141414" : "#fff",
          borderRadius: 22, padding: "40px 36px",
          border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: dark ? "0 32px 80px rgba(0,0,0,0.45)" : "0 32px 80px rgba(0,0,0,0.08)",
        }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "44px 0" }}
              >
                <div style={{ fontSize: 64, marginBottom: 18 }}>🎉</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: dark ? "#fff" : "#111" }}>{t.form.ok}</h3>
              </motion.div>
            ) : (
              <motion.div key="form" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input placeholder={t.form.f1} style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input placeholder={t.form.f2} style={inputStyle} value={form.person} onChange={e => setForm({ ...form, person: e.target.value })} />
                </div>
                <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input type="tel" placeholder={t.form.f3} style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  <input placeholder={t.form.f4} style={inputStyle} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>
                <textarea
                  rows={4} placeholder={t.form.f5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { if (form.name && form.person && form.phone) setSubmitted(true); }}
                  style={{
                    background: "linear-gradient(135deg, #FF6A00, #FF9A3C)",
                    border: "none", borderRadius: 12, padding: "16px",
                    color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(255,106,0,0.35)", fontFamily: "inherit", marginTop: 4,
                  }}
                >{t.form.btn}</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t, dark, scrollTo }) {
  const cols = [
    { title: t.footer.company, items: ["About Us", "Our Work", "Blog", "Careers"] },
    { title: t.footer.services, items: ["Social Media", "Promotions", "Menu Design", "Campaigns"] },
    { title: t.footer.contact, items: ["hello@creativeagents.in", "+91 98765 43210", "Mumbai, India"] },
  ];

  return (
    <footer style={{
      background: dark ? "#080808" : "#111",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "64px 24px 28px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 36, marginBottom: 52,
        }}>
          <div>
            <CALogo dark={true} />
            <p style={{ fontSize: 13, color: "#555", marginTop: 16, lineHeight: 1.75, maxWidth: 240 }}>{t.footer.tag}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {["📸", "🐦", "💼", "👥"].map((ic, i) => (
                <div key={i} style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 15,
                }}>{ic}</div>
              ))}
            </div>
          </div>
          {cols.map(({ title, items }) => (
            <div key={title}>
              <div style={{
                fontWeight: 700, fontSize: 11, color: "#666",
                marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.1em",
              }}>{title}</div>
              {items.map((item, i) => (
                <div key={i} style={{ marginBottom: 11 }}>
                  <span style={{ fontSize: 13, color: "#555", cursor: "pointer" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10,
        }}>
          <span style={{ fontSize: 12, color: "#444" }}>{t.footer.rights}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6A00" }} />
            <span style={{ fontSize: 12, color: "#FF6A00", fontWeight: 600 }}>Creative Agents</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("hero");
  const t = T[lang];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(id);
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = ["hero", "proof", "showcase", "features", "benefits", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "hero") setActiveTab("hero");
            else if (id === "showcase") setActiveTab("showcase");
            else if (id === "features") setActiveTab("features");
            else if (id === "benefits") setActiveTab("benefits");
            else if (id === "contact") setActiveTab("contact");
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      background: dark ? "#0B0B0B" : "#FAFAFA",
      minHeight: "100vh",
      transition: "background 0.4s ease",
    }}>
      <Navbar
        dark={dark} setDark={setDark}
        lang={lang} setLang={setLang}
        t={t} activeTab={activeTab} setActiveTab={setActiveTab}
      />
      <Hero t={t} dark={dark} scrollTo={scrollTo} />
      <Proof t={t} dark={dark} />
      <Showcase t={t} dark={dark} />
      <Features t={t} dark={dark} />
      <Benefits t={t} dark={dark} />
      <CTABanner t={t} dark={dark} scrollTo={scrollTo} />
      <Contact t={t} dark={dark} />
      <Footer t={t} dark={dark} scrollTo={scrollTo} />
    </div>
  );
}
