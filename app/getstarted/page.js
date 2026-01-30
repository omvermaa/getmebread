import React from "react";
import Link from "next/link";
import Image from "next/image";

const GetStarted = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Create Account",
      description:
        "Join the community by signing up with your Google or GitHub account. It's quick, secure, and gets you a personalized page instantly.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
        </svg>
      ),
    },
    {
      number: 2,
      title: "Set Up Your Profile",
      description:
        "Head to your Dashboard. Upload a cool profile picture and a banner image to make your page stand out to your fans.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
    },
    {
      number: 3,
      title: "Connect Razorpay (Important)",
      description:
        "To receive money directly into your bank account, you need to add your Razorpay API Keys. This ensures 100% of the funds go to you.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      specialContent: true, // Marker to render the detailed guide below
    },
    {
      number: 4,
      title: "Start Getting Funded",
      description:
        "Share your unique profile link (e.g., getmebread.com/yourname) with your audience on social media and start receiving support!",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen text-white py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            How to Get Started
          </h1>
          <p className="text-slate-400 text-lg">
            Follow these 4 simple steps to start funding your creative journey.
          </p>
        </div>

        {/* Steps Container */}
        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative group bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-3xl hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">

                {/* Number Badge */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800 text-purple-400 font-bold text-2xl border border-slate-700 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <span className="text-slate-500">{step.icon}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Special Razorpay Guide Section */}
                  {step.specialContent && (
                    <div className="mt-6 bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                      <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        How to get Razorpay Keys:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 ml-1">
                        <li>
                          Go to the <a href="https://dashboard.razorpay.com/" target="_blank" className="text-blue-400 hover:underline">Razorpay Dashboard</a> and Log in / Sign up.
                        </li>
                        <li>
                          Navigate to <strong>Settings</strong> (Gear Icon) → <strong>API Keys</strong> tab.
                        </li>
                        <li>
                          Click on <strong>Generate Key</strong> (or Regenerate Key).
                        </li>
                        <li>
                          Copy the <code className="bg-slate-800 px-1 py-0.5 rounded text-purple-300">Key ID</code> and <code className="bg-slate-800 px-1 py-0.5 rounded text-purple-300">Key Secret</code>.
                        </li>
                        <li>
                          Paste them into your <strong>GetMeBread Dashboard</strong> settings.
                        </li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
            <Link href="/dashboard">
              <button className="bg-slate-900 rounded-full px-10 py-4 font-bold text-xl text-white hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                Start Your Page Now 🚀
              </button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            It takes less than 2 minutes to get set up.
          </p>
        </div>

      </div>
    </div>
  );
};

export default GetStarted;