import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center text-white px-5 md:px-0">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-10 text-center gap-6">
        <div className="font-bold text-5xl md:text-7xl flex items-center justify-center gap-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent p-2">
          Get Me a Bread
          <span className="text-white">
            <Image
              unoptimized
              src="/bread.gif"
              alt="bread"
              width={80}
              height={80}
              className="inline-block pb-2 hover:scale-110 transition-transform duration-300"
            />
          </span>
        </div>

        <p className="text-center px-4 md:px-0 text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-6">
          A crowdfunding platform for creators to fund their projects.
          <span className="block mt-4 text-slate-400 text-lg">
            Get funded by your fans and followers. Start now!
          </span>
        </p>

        <div className="flex gap-4 mt-6">
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full font-bold text-lg hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
              Start Here
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-4 bg-slate-800 rounded-full font-bold text-lg hover:bg-slate-700 hover:scale-105 transition-all border border-slate-700">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 w-full opacity-5 max-w-4xl mx-auto rounded-full my-10"></div>

      {/* Features Section */}
      <div className="w-full py-20 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Your Fans can Buy you a Bread!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

          {/* Card 1 */}
          <div className="flex flex-col items-center justify-center bg-slate-900/40 p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-300 group">
            <div className="bg-slate-800/50 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <Image unoptimized src="/avatar.gif" alt="fans" width={80} height={80} className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fund Yourself</h3>
            <p className="text-slate-400 text-center text-sm">
              Your fans are available for you to help you. Use their power to fund your next big project.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center justify-center bg-slate-900/40 p-8 rounded-3xl border border-slate-700/50 hover:border-green-500/50 hover:bg-slate-900/60 transition-all duration-300 group">
            <div className="bg-slate-800/50 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <Image unoptimized src="/coin.gif" alt="coin" width={80} height={80} className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fund Your Project</h3>
            <p className="text-slate-400 text-center text-sm">
              Your fans are willing to contribute financially. Give them a reason to support you.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center justify-center bg-slate-900/40 p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all duration-300 group">
            <div className="bg-slate-800/50 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <Image unoptimized src="/group.gif" alt="group" width={80} height={80} className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-3">Grow Together</h3>
            <p className="text-slate-400 text-center text-sm">
              Build a community that grows with you. Collaborate and succeed together.
            </p>
          </div>

        </div>
      </div>

      <div className="bg-white h-1 w-full opacity-5 max-w-4xl mx-auto rounded-full"></div>

      {/* Video / Learning Section */}
      <div className="flex flex-col items-center justify-center py-20 w-full max-w-4xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Learn More About Us
        </h2>

        <div className="w-full aspect-video bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative group">
          {/* Placeholder for iframe */}
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/voF1plqqZJA?si=ZZMvsIb7Q6GD0d2C" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

    </div>
  );
};