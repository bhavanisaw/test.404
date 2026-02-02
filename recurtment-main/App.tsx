
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Hero } from './components/Hero';
import { Teaser } from './components/Teaser';
import { About } from './components/About';
import { RecruitmentForm } from './components/RecruitmentForm';
import { Footer } from './components/Footer';
import { MatrixRain } from './components/MatrixRain';
import  Navbar  from "./components/Navbar";
import Login from "./components/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const [isPlasmaActive, setIsPlasmaActive] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);


  useEffect(() => {
    // Initial entrance sequence
    const tl = gsap.timeline();
    tl.to(".launch-overlay", { 
      opacity: 0, 
      duration: 1.5, 
      delay: 1, 
      onComplete: () => setInitialized(true) 
    });

    // ScrollTrigger to detect when Netra Core Protocol (About section) is in view
    ScrollTrigger.create({
      trigger: "#about-section",
      start: "top center",
      end: "bottom center",
      onEnter: () => setIsPlasmaActive(true),
      onEnterBack: () => setIsPlasmaActive(true),
      onLeave: () => setIsPlasmaActive(false),
      onLeaveBack: () => setIsPlasmaActive(false),
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

    if (!user) return <Login onLogin={() => {}} />;

    {user && (
  <button
    onClick={() => auth.signOut()}
    className="fixed top-4 right-4 px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black rounded z-50"
  >
    Logout
  </button>
)}

    


  return (
    <div className="relative min-h-screen bg-black overflow-hidden" ref={mainRef}>
      <Navbar />

      {/* Background Layers */}
      <BackgroundCanvas />
      <MatrixRain />
      
      {/* Global Plasma Pulse Layer */}
      <div className={`plasma-layer ${isPlasmaActive ? 'plasma-active' : ''}`} />

      {/* Loading Screen / Initial Flash */}
      {!initialized && (
        <div className="launch-overlay fixed inset-0 z-[10000] bg-black flex items-center justify-center">
          <div className="text-[#00FF00] font-mono text-xl animate-pulse">
            [ INITIALIZING_BREACH_PROTOCOL... ]
          </div>
        </div>
      )}

            {/* Content */}
      <div className="relative z-10">
        <div id="home" className="pt-8 md:pt-20">
          <Hero />
        </div>
        

        <Teaser />

        <div id="about" className="pt-24">
          <About />
        </div>

        <div id="contact" className="pt-24">
          <RecruitmentForm />
        </div>

        <Footer />
      </div>


      {/* Global Sound Toggle (Placeholder UI) */}
      <div className="fixed bottom-8 left-8 z-[5000] flex space-x-2 items-center">
         <div className="w-2 h-2 bg-[#00FF00] rounded-full animate-ping"></div>
         <span className="text-[10px] text-[#00FF00] font-mono opacity-50 uppercase tracking-widest">
           Neural Link Active
         </span>
      </div>
    </div>
  );
};

export default App;
