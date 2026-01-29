"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchpayment } from "@/actions/useractions";
import Image from "next/image";

const Notifications = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signup");
    }
    if (status === "authenticated" && session?.user?.email) {
      getData();
    }
  }, [status, session, router]);

  const getData = async () => {
    try {
      const data = await fetchpayment(session.user.email);
      
      // ✅ FIX: Sort by Date (Newest First)
      // We convert date strings to Date objects and compare them
      const sortedData = data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setNotifications(sortedData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    }).format(date);
  };

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex justify-center items-center text-white">Loading notifications...</div>;
  }

  return (
    <div className="min-h-screen text-white px-4 md:px-0 py-10">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Notifications
        </h1>

        <div className="flex flex-col gap-4">
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <div 
                key={index} 
                className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800/60 transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                        {note.amount >= 500 ? "🚀" : "🍞"} 
                    </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">
                      <span className="text-purple-400">{note.name || "Someone"}</span> 
                      <span className="text-slate-300 text-base font-normal"> bought you a bread!</span>
                    </h3>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                        {note.createdAt ? formatDate(note.createdAt) : "Just now"}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mt-1 mb-2">
                    {note.message ? `"${note.message}"` : "No message included"}
                  </p>

                  <div className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded-full border border-green-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>
                    Received ₹{note.amount}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-xl font-bold">No notifications yet</h2>
                <p className="text-slate-400 max-w-sm">Share your profile link with your fans to start receiving support!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Notifications;