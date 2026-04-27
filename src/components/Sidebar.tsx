import { LayoutGrid, ShoppingBag, MessageSquare, TrendingUp, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: "product", icon: ShoppingBag, label: "Product Magic" },
    { id: "companion", icon: MessageSquare, label: "Customer Companion" },
    { id: "vibe", icon: TrendingUp, label: "Market Vibe" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 bg-emerald-950 border-r border-pak-gold/20 w-72 transition-transform duration-300 transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-pak-gold p-2 rounded-xl">
                <LayoutGrid className="w-6 h-6 text-emerald-950" />
              </div>
              <div>
                <h1 className="font-bold text-pak-gold leading-tight">Bazaar-Sense</h1>
                <p className="text-[10px] uppercase tracking-widest text-pak-gold/50">Empowering Biz</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-emerald-900 rounded-lg text-pak-gold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-4 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group",
                  activeTab === item.id
                    ? "bg-pak-gold text-emerald-950 font-bold shadow-lg shadow-pak-gold/10"
                    : "hover:bg-emerald-900 text-emerald-100 hover:text-pak-gold"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-emerald-950" : "text-pak-gold")} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <footer className="pt-6 border-t border-emerald-900/50">
            <div className="bg-emerald-900/50 rounded-2xl p-4 text-center">
              <p className="text-[10px] text-emerald-400 mb-2 uppercase tracking-tighter">Powered by</p>
              <div className="bg-emerald-950 px-3 py-2 rounded-lg border border-pak-gold/30">
                <span className="text-xs font-semibold text-pak-gold">Google AI Studio</span>
              </div>
            </div>
          </footer>
        </div>
      </aside>
    </>
  );
}
