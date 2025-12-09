import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-angelic-pink/20 via-white to-angelic-teal/20 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-6 drop-shadow-sm tracking-tighter">
        Task<span className="text-angelic-pink">Flow</span>
      </h1>
      <p className="text-xl text-gray-500 mb-8 max-w-md">
        Experience the future of project management with our angelic, glass-morphic interface.
      </p>

      <Link
        href="/board/demo"
        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-md border border-white/60 shadow-xl rounded-full text-gray-700 font-semibold transition-all hover:scale-105 hover:bg-white/70 hover:shadow-2xl"
      >
        <span>Enter Workspace</span>
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Link>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-angelic-peach/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-angelic-teal/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
