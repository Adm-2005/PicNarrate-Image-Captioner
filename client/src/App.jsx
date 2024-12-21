import { useState } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from './sections/Hero';

const App = () => {
  return (
    <div className="flex flex-col gap-7 justify-between min-h-screen bg-background">
      <Navbar />

      <Hero />

      <Footer />
    </div>
  )
}

export default App;