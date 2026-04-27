/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Menu, LogOut, LayoutGrid } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ProductMagic from "./components/ProductMagic";
import CustomerCompanion from "./components/CustomerCompanion";
import MarketVibe from "./components/MarketVibe";
import BusinessTip from "./components/BusinessTip";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState("product");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "product":
        return <ProductMagic />;
      case "companion":
        return <CustomerCompanion />;
      case "vibe":
        return <MarketVibe />;
      default:
        return <ProductMagic />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "product": return "Product Magic";
      case "companion": return "Customer Companion";
      case "vibe": return "Market Vibe";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 flex font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 lg:ml-72 flex flex-col p-4 md:p-8 relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="bg-pak-gold p-1.5 rounded-lg">
                <LayoutGrid className="w-5 h-5 text-emerald-950" />
              </div>
              <h1 className="font-bold text-pak-gold">Bazaar-Sense</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-emerald-900 border border-emerald-800 rounded-xl text-pak-gold"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-4xl w-full mx-auto space-y-8 pb-12">
          <header className="space-y-2">
            <div className="flex items-center gap-3">
               <h2 className="text-3xl font-bold bg-gradient-to-r from-pak-gold to-pak-gold-light bg-clip-text text-transparent">
                {getTitle()}
              </h2>
            </div>
            <p className="text-emerald-400/80 text-sm italic">
              Empowering Pakistan's Small Businesses with Gemini 1.5 Flash
            </p>
          </header>

          <BusinessTip />

          <section className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>

        {/* Global Footer */}
        <footer className="mt-auto pt-10 text-center border-t border-emerald-900/30">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-emerald-600 font-medium tracking-widest uppercase">
              Bazaar-Sense AI © 2026
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-800">
               <span className="text-[10px] text-emerald-400 font-semibold tracking-wider">Powered by</span>
               <div className="h-3 w-px bg-emerald-800" />
               <span className="text-[10px] font-bold text-pak-gold">Google AI Studio</span>
            </div>
          </div>
        </footer>
      </main>
      
      {/* Visual Accents */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-pak-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-pak-emerald/10 rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}

