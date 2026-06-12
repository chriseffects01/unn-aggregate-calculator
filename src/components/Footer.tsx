import { MessageSquare, Globe, Users } from "lucide-react"; // optional or use regular SVGs

export default function Footer() {
  return (
    <footer className="w-full max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Dev Work / WhatsApp Services */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-150 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>💻</span> Need a Website?
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Get custom software, department portals, calculators, or landing
              pages built professionally.
            </p>
          </div>
          <a
            href="https://wa.me/+2347025295719"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition"
          >
            Chat with Chris on WhatsApp
          </a>
        </div>

        {/* Right Side: Communities & Channels */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-150 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center font-bold text-orange-600 shrink-0 overflow-hidden">
              UNN
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-800 dark:text-slate-200">
                Stay Updated on UNN Admission
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Join our channels to get immediate updates on cut-off marks,
                lists, and clearances.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <a
              href="https://chat.whatsapp.com/CSAFfwBnI9WKQ3Jt6jNx1b?mode=gi_t"
              className="text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium text-xs py-2 px-3 rounded-lg transition"
            >
              Join WhatsApp Group
            </a>
            <a
              href="https://whatsapp.com/channel/0029VbBntl1DeOMzkgVJKv0G"
              target="_blank"
              className="text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium text-xs py-2 px-3 rounded-lg transition"
            >
              View Channel
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-8">
        © {new Date().getFullYear()} UNN Post-UTME Calculator.
      </p>
    </footer>
  );
}
