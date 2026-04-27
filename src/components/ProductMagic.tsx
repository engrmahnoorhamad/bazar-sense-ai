import { useState } from "react";
import { Sparkles, Copy, Check, Send } from "lucide-react";
import { generateProductDescription } from "../lib/gemini";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

export default function ProductMagic() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await generateProductDescription(input);
      setOutput(result || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToWhatsApp = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-900/50 border border-pak-gold/20 rounded-2xl p-6 shadow-sm">
        <label className="block text-pak-gold text-sm font-semibold mb-3 tracking-wide">
          Describe your product (Enter raw details)
        </label>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., blue khaddi suit, summer collection, high quality fabric..."
            className="w-full bg-emerald-950 border border-emerald-800 rounded-xl p-4 text-white placeholder-emerald-700/50 focus:ring-2 focus:ring-pak-gold/50 focus:border-transparent outline-none min-h-[120px] transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="absolute bottom-4 right-4 bg-pak-gold hover:bg-pak-gold-light active:scale-95 disabled:opacity-50 disabled:scale-100 p-2 rounded-lg text-emerald-950 transition-all cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="mt-3 text-xs text-emerald-400">
          AI will generate English and Urdu descriptions + WhatsApp ready text.
        </p>
      </div>

      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-900/30 border border-pak-gold/20 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="flex items-center gap-2 text-pak-gold font-bold">
                <Sparkles className="w-4 h-4" />
                Your Product Magic
              </h3>
              <button
                onClick={copyToWhatsApp}
                className="flex items-center gap-2 text-xs bg-pak-gold/10 hover:bg-pak-gold/20 text-pak-gold px-3 py-1.5 rounded-full border border-pak-gold/30 transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy for WhatsApp"}
              </button>
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
