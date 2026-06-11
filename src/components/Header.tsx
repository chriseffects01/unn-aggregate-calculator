import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full text-center my-6 max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-28 h-28 relative rounded-full mb-3  overflow-hidden border border-slate-200 dark:border-slate-800 bg-white shadow-sm">
        <Image
          src="/unn-logo.png"
          alt="UNN Logo"
          fill
          priority
          sizes="(max-w-768px) 64px, 64px"
          loading="eager"
          className="object-contain p-1"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tight">
        UNN AGGREGATE CALCULATOR
      </h1>
      <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
        Check your official UNN screening aggregate score instantly.
      </p>
    </header>
  );
}
