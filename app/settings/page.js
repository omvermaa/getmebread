"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, deleteUserAccount } from "@/actions/useractions"; 
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Settings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State for settings (You would typically add these fields to your User Schema)
  const [settings, setSettings] = useState({
    emailAlerts: true,
    showDonationAmounts: true,
    publicLeaderboard: true,
    marketingEmails: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signup");
    } else if (status === "authenticated") {
      // Here you would fetch actual settings from DB. 
      // For now, we simulate fetching user data
      fetchuser(session.user.email).then((data) => {
        // If your DB has settings fields, map them here:
        // setSettings({ emailAlerts: data.emailAlerts, ... })
        setLoading(false);
      });
    }
  }, [status, router, session]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Here you would call a server action like: await updateSettings(settings);
    
    setSaving(false);
    toast.success('Preferences saved successfully!', {
        theme: "dark",
        transition: Bounce,
    });
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure? This action cannot be undone and will delete all your data.")) {
        
        try {
            const result = await deleteUserAccount(session.user.email);
            if (result.success) {
                toast.success("Account deleted successfully.", {
                    theme: "dark",
                    transition: Bounce,
                });
                // Wait a bit so user sees the toast, then sign out
                setTimeout(() => {
                    signOut({ callbackUrl: '/' });
                }, 1000);
            } else {
                toast.error("Failed to delete account.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred.");
        }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-white">Loading settings...</div>;
  }

  return (
    <div className="min-h-screen px-4 md:px-0 py-10 pb-20">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-400 mb-8">Manage your account preferences and privacy.</p>

        <div className="flex flex-col gap-8">

          {/* --- Section 1: Notifications --- */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold">Notifications</h2>
            </div>

            <div className="space-y-6">
                <ToggleItem 
                    title="Email Alerts" 
                    desc="Receive an email whenever someone buys you a bread."
                    isOn={settings.emailAlerts}
                    onToggle={() => handleToggle('emailAlerts')}
                />
                 <ToggleItem 
                    title="Marketing Emails" 
                    desc="Receive updates about new features and promotions."
                    isOn={settings.marketingEmails}
                    onToggle={() => handleToggle('marketingEmails')}
                />
            </div>
          </div>

          {/* --- Section 2: Privacy & Display --- */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold">Privacy & Display</h2>
            </div>

            <div className="space-y-6">
                <ToggleItem 
                    title="Show Donation Amounts" 
                    desc="Display the amount of money raised on your public profile."
                    isOn={settings.showDonationAmounts}
                    onToggle={() => handleToggle('showDonationAmounts')}
                />
                <ToggleItem 
                    title="Public Leaderboard" 
                    desc="Show the top supporters list on your payment page."
                    isOn={settings.publicLeaderboard}
                    onToggle={() => handleToggle('publicLeaderboard')}
                />
            </div>
          </div>

          {/* --- Save Button --- */}
          <div className="flex justify-end">
             <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20 disabled:opacity-50"
             >
                {saving ? "Saving..." : "Save Changes"}
             </button>
          </div>

          {/* --- Section 3: Danger Zone --- */}
          <div className="border border-red-500/30 bg-red-900/10 rounded-2xl p-6 md:p-8 mt-4">
             <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
             <p className="text-slate-400 text-sm mb-6">
                Once you delete your account, there is no going back. Please be certain.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
                 <button 
                    onClick={handleDeleteAccount}
                    className="border border-red-500/50 text-red-400 hover:bg-red-500/10 font-semibold py-2 px-6 rounded-lg transition-colors text-sm"
                 >
                    Delete Account
                 </button>
                 <button 
                    onClick={() => signOut()}
                    className="border border-slate-600 text-slate-300 hover:bg-slate-800 font-semibold py-2 px-6 rounded-lg transition-colors text-sm"
                 >
                    Sign Out
                 </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Helper Component for Toggle Switch ---
const ToggleItem = ({ title, desc, isOn, onToggle }) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <h3 className="font-semibold text-slate-200">{title}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
            </div>
            {/* Custom Toggle Switch */}
            <button 
                onClick={onToggle}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isOn ? 'bg-green-500' : 'bg-slate-700'}`}
            >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
        </div>
    );
};

export default Settings;