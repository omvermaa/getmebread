"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateProfile, fetchuser } from "@/actions/useractions";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Image from "next/image";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showRazorpayId, setShowRazorpayId] = useState(false);
  const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);
  const [initialForm, setInitialForm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [form, setForm] = useState({
    name: "",
    username: "",
    profilePic: "",
    coverPic: "",
    razorpayId: "",
    razorpaySecret: ""
  });

  // --- Logic remains the same ---
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signup");
    }
    if (status === "authenticated") {
      fetchuser(session.user.email).then((userData) => {
        if (userData) {
          setForm(userData);
          setInitialForm(userData);
        }
        setLoadingData(false);
      });
    }
  }, [status, router, session]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "getmebread"); // Replace with yours
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, [field]: data.secure_url }));
        toast.info(`${field === 'coverPic' ? 'Cover' : 'Profile'} image uploaded! Save to apply.`);
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (JSON.stringify(form) === JSON.stringify(initialForm)) return;
    
    await updateProfile(form, session.user.email);
    window.dispatchEvent(new Event('userUpdated')); // Update Navbar
    setInitialForm(form);
    toast.success('Profile Updated Successfully!', { theme: "dark", transition: Bounce });
  };

  if (status === "loading" || loadingData) {
    return <div className="min-h-screen flex justify-center items-center text-white">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-10 pb-20">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-slate-400">Manage your profile, payment details, and appearance.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Preview Card --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="h-24 bg-gradient-to-r from-purple-600 to-blue-600 relative">
               {/* Cover Preview */}
               {form.coverPic && (
                 <Image src={form.coverPic} alt="Cover" fill className="object-cover opacity-80" />
               )}
            </div>
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800 relative shadow-lg">
                   <Image 
                     src={form.profilePic || session?.user?.image || "/avatar.gif"} 
                     alt="Profile" 
                     fill 
                     className="object-cover" 
                   />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">{form.name || "Your Name"}</h2>
              <p className="text-sm text-slate-400 font-medium">@{form.username || "username"}</p>
              
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <button 
                   onClick={() => router.push(`/${form.username}`)}
                   disabled={!form.username}
                   className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors border border-slate-600"
                >
                   View Public Page
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Column: Edit Form --- */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-8 space-y-8">
            
            {/* Section: Basic Info */}
            <div>
               <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                 <span className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></span>
                 Basic Information
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Display Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Username</label>
                    <input 
                      type="text" 
                      name="username" 
                      value={form.username} 
                      onChange={handleChange} 
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="johndoe" 
                    />
                 </div>
               </div>
            </div>

            {/* Section: Images */}
            <div>
               <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                 <span className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></span>
                 Branding
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Pic Uploader */}
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-300">Profile Picture</label>
                     <div className="relative group">
                        <input type="file" onChange={(e) => handleFileUpload(e, 'profilePic')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-700 border-dashed rounded-xl p-3 group-hover:bg-slate-800/50 transition-colors">
                           <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                           </div>
                           <div className="text-sm text-slate-400">
                              {uploading ? "Uploading..." : "Click to upload avatar"}
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Cover Pic Uploader */}
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-300">Cover Image</label>
                     <div className="relative group">
                        <input type="file" onChange={(e) => handleFileUpload(e, 'coverPic')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-700 border-dashed rounded-xl p-3 group-hover:bg-slate-800/50 transition-colors">
                           <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                           </div>
                           <div className="text-sm text-slate-400">
                              {uploading ? "Uploading..." : "Click to upload banner"}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Section: Payment */}
            <div>
               <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                 <span className="p-1.5 bg-green-500/10 text-green-400 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></span>
                 Razorpay Credentials
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Key ID</label>
                    <div className="relative">
                       <input 
                         type={showRazorpayId ? "text" : "password"} 
                         name="razorpayId" 
                         value={form.razorpayId} 
                         onChange={handleChange} 
                         className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-10"
                       />
                       <button type="button" onClick={() => setShowRazorpayId(!showRazorpayId)} className="absolute right-3 top-3.5 text-slate-400 hover:text-white">
                          {showRazorpayId ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                       </button>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Key Secret</label>
                    <div className="relative">
                       <input 
                         type={showRazorpaySecret ? "text" : "password"} 
                         name="razorpaySecret" 
                         value={form.razorpaySecret} 
                         onChange={handleChange} 
                         className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-10"
                       />
                       <button type="button" onClick={() => setShowRazorpaySecret(!showRazorpaySecret)} className="absolute right-3 top-3.5 text-slate-400 hover:text-white">
                          {showRazorpaySecret ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                       </button>
                    </div>
                 </div>
               </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={uploading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading Images..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
