import Header from "@/src/components/Header";
import CalculatorForm from "@/src/components/CalculatorForm";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col justify-between p-4 sm:p-8 transition-colors duration-300">
      <div>
        <Header />
        <main className="mt-4">
          <CalculatorForm />
        </main>
      </div>
      <Footer />
    </div>
  );
}
