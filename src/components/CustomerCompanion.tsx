import { useState } from "react";
import { MessageSquare, Copy, Check, User2, Bot } from "lucide-react";
import { generateCustomerReply } from "../lib/gemini";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

export default function CustomerCompanion() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReply = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await generateCustomerReply(input);
      setOutput(result || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-900/50 border border-pak-gold/20 rounded-2xl p-6 shadow-sm">
        <label className="block text-pak-gold text-sm font-semibold mb-3 tracking-wide">
          Paste Customer Message (English, Urdu, or Roman Urdu)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 'Assalam o alaikum, kya ye suit available hai? Price kya hai?'"
          className="w-full bg-emerald-950 border border-emerald-800 rounded-xl p-4 text-white placeholder-emerald-700/50 focus:ring-2 focus:ring-pak-gold/50 focus:border-transparent outline-none min-h-[120px] transition-all"
        />
        <button
          onClick={handleReply}
          disabled={loading || !input.trim()}
          className="w-full mt-4 bg-pak-gold hover:bg-pak-gold-light active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-emerald-950 transition-all cursor-pointer"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <MessageSquare className="w-5 h-5" />
              Generate Professional Reply
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid gap-4"
          >
            <div className="flex items-start gap-3 opacity-60">
              <div className="bg-emerald-800 p-2 rounded-lg">
                <User2 className="w-4 h-4 text-emerald-200" />
              </div>
              <div className="bg-emerald-800/20 px-4 py-2 rounded-2xl text-sm italic italic">
                {input}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-pak-gold p-2 rounded-lg shrink-0">
                <Bot className="w-4 h-4 text-emerald-950" />
              </div>
              <div className="bg-emerald-900/40 border border-pak-gold/10 p-6 rounded-2xl w-full relative group">
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 bg-emerald-950/50 rounded-lg text-pak-gold hover:bg-emerald-950 transition-all"
                  title="Copy reply"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="prose prose-invert prose-emerald max-w-none prose-sm leading-relaxed">
                  <Markdown>{output}</Markdown>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
