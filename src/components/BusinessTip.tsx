import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { getBusinessTip } from "../lib/gemini";
import { motion, AnimatePresence } from "motion/react";

export default function BusinessTip() {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTip() {
      try {
        const result = await getBusinessTip();
        setTip(result || null);
      } catch (error) {
        console.error("Error fetching tip:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTip();
  }, []);

  return (
    <div className="bg-gradient-to-br from-pak-emerald to-emerald-900 border border-pak-gold/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="bg-pak-gold p-2 rounded-lg shrink-0">
          <Lightbulb className="w-5 h-5 text-emerald-950" />
        </div>
        <div>
          <h3 className="text-pak-gold font-bold text-sm uppercase tracking-wider mb-2">
            Business Tip of the Day
          </h3>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-12 w-full bg-emerald-800/50 animate-pulse rounded"
              />
            ) : (
              <motion.p
                key="tip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-50 text-sm leading-relaxed"
              >
                {tip}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pak-gold/5 rounded-full blur-2xl" />
    </div>
  );
}
