import { useState } from "react";
import { TrendingUp, Search, Info } from "lucide-react";
import { askMarketTrends } from "../lib/gemini";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

export default function MarketVibe() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await askMarketTrends(query);
      setOutput(result || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Trending for Wedding Season 2026?",
    "Lawn pre-launch trends?",
    "E-commerce growth in Karachi 2026",
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-900/50 border border-pak-gold/20 rounded-2xl p-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <TrendingUp size={120} />
        </div>
        <label className="block text-pak-gold text-sm font-semibold mb-3 tracking-wide">
          Ask about Pakistani Market Trends
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g., What's trending for the 2026 Wedding Season?"
            className="flex-1 bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-3 text-white placeholder-emerald-700/50 focus:ring-2 focus:ring-pak-gold/50 focus:border-transparent outline-none transition-all"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="bg-pak-gold hover:bg-pak-gold-light active:scale-95 disabled:opacity-50 disabled:scale-100 p-3 rounded-xl text-emerald-950 transition-all cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                handleSearch();
              }}
              disabled={loading}
              className="text-[10px] bg-emerald-800/40 hover:bg-emerald-800/60 text-emerald-100 px-3 py-1 rounded-full border border-emerald-700/50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-900/30 border border-pak-gold/20 rounded-2xl p-6 relative"
          >
            <div className="flex items-center gap-2 text-pak-gold font-bold mb-4">
              <Info className="w-4 h-4" />
              Market Insights
            </div>
            <div className="prose prose-invert prose-emerald max-w-none">
              <Markdown>{output}</Markdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
