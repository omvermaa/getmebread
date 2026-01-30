import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white px-4 md:px-0 pb-20">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent pb-4">
          Fueling Creativity, <br /> One Bread at a Time.
        </h1>
        <p className="text-lg text-slate-400 mt-6 leading-relaxed">
          GetMeBread is a crowdfunding platform designed for creators, developers, and artists. 
          Stop worrying about payment gateways and start getting supported by your fans directly.
        </p>
        <div className="mt-10 flex gap-3 md:flex-row flex-col items-center justify-centergap-4">
          <Link href="/getstarted">
            <button className="px-8 py-4 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-purple-500/20">
              How to Get Started
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-slate-800 rounded-full font-bold text-lg hover:bg-slate-700  transition-all border border-slate-700">
              Log In
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-6xl mt-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 px-6">
          {/* Step 1 */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-purple-500 transition-colors duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-2xl">
              📝
            </div>
            <h3 className="text-xl font-bold mb-3">Create Your Page</h3>
            <p className="text-slate-400">
              Sign up and customize your profile. Add your social links, profile picture, and tell your fans what you do.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition-colors duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-2xl">
              🤝
            </div>
            <h3 className="text-xl font-bold mb-3">Connect Razorpay</h3>
            <p className="text-slate-400">
              Add your Razorpay Key and Secret in settings. Payments go directly to your bank account, not a wallet.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500 transition-colors duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-2xl">
              💰
            </div>
            <h3 className="text-xl font-bold mb-3">Get Funded</h3>
            <p className="text-slate-400">
              Share your unique link (getmebread/yourname) with your audience and start receiving support instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Stats/Community Section */}
      <section className="mt-32 w-full bg-gradient-to-b from-transparent to-slate-900/50 py-20 border-y border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-10 text-center">
          <div>
            <div className="text-5xl font-bold text-white mb-2">10k+</div>
            <div className="text-slate-400 uppercase tracking-wider text-sm">Community Members</div>
          </div>
          <div className="hidden md:block w-[1px] h-20 bg-slate-700"></div>
          <div>
            <div className="text-5xl font-bold text-white mb-2">₹2M+</div>
            <div className="text-slate-400 uppercase tracking-wider text-sm">Funds Raised</div>
          </div>
          <div className="hidden md:block w-[1px] h-20 bg-slate-700"></div>
          <div>
            <div className="text-5xl font-bold text-white mb-2">50+</div>
            <div className="text-slate-400 uppercase tracking-wider text-sm">Creative Categories</div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-6xl mt-32 px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
                <div className="bg-purple-900/30 p-3 rounded-lg text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Lightning Fast Settlements</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Unlike other platforms that hold your money for weeks, our direct Razorpay integration means funds land in your account immediately.
                    </p>
                </div>
            </div>
            
            <div className="flex gap-4 items-start">
                <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">0% Platform Fees</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We don't take a cut of your hard-earned money. You only pay standard transaction fees charged by the payment processor.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="mt-32 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-slate-400 mb-8">Join thousands of creators who are already funding their dreams.</p>
          <Link href="/signup">
            <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-slate-200 transition-all">
              Join for Free
            </button>
          </Link>
      </section>

    </div>
  );
};

export default About;