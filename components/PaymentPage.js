"use client";
import { React, useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Bounce } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import {
  fetchuser,
  fetchuserbyUsername,
  fetchpayment,
  createRazorpayOrder,
} from "@/actions/useractions";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();

  const [paymentForm, setpaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const [error, setError] = useState("");
  const [currentUser, setcurrentUser] = useState({});
  const [pageOwner, setpageOwner] = useState({});
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (username) {
      getData();
    }
  }, [username, session]);

  useEffect(() => {
    if (searchParams.get("payment") === "success" && username) {
      toast.success('🦄 Payment Done!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      router.replace(`/${username}`);
    }
  }, [searchParams, username, router]);

  const handleChange = (e) => {
    setpaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const getData = async () => {
    const u = await fetchuserbyUsername(username);
    setpageOwner(u);

    if (session?.user?.email) {
      let currentUserData = await fetchuser(session.user.email);
      setcurrentUser(currentUserData);
    }

    if (u && u.email) {
      const dbPayments = await fetchpayment(u.email);
      setpayments(dbPayments);
    }
  };

  const validateForm = () => {
    if (!paymentForm.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    return true;
  };

  const pay = async (amount) => {
    if (!validateForm()) return;
    let pageOwner = await fetchuserbyUsername(username);
    const a = await createRazorpayOrder(amount, pageOwner.email, paymentForm);
    const orderId = a.id;
    var options = {
      key: pageOwner.razorpayId,
      amount: amount,
      currency: "INR",
      name: "GetMeFunding",
      description: "Support Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* --- Cover Image Section --- */}
      <div className="relative w-full h-[350px]">
        <Image
          className="w-full h-full object-cover shadow-lg"
          src={pageOwner.coverPic || "/patreon_banner.gif"}
          alt="cover"
          fill
          unoptimized={true}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
             {/* ✅ CIRCULAR PROFILE PIC FIX */}
            <Image
              width={140}
              height={140}
              className="rounded-full aspect-square border-4 border-slate-950 object-cover shadow-2xl bg-slate-800"
              src={pageOwner.profilePic || "/avatar.gif"}
              alt="profile"
              unoptimized={true}
            />
          </div>
          
          <h1 className="text-3xl font-bold mt-4 text-white">
            {pageOwner.name || `@${pageOwner.username}`}
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-medium">
            @{pageOwner.username}
          </p>
          
          <p className="text-slate-300 mt-4 max-w-lg">
             Lets help {pageOwner.name} achieve their goals!
          </p>

          <div className="mt-4 flex items-center gap-4 text-sm font-semibold bg-slate-900/60 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-700/50">
            <span className="text-slate-200">
               {payments.length} Payments
            </span>
            <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
            <span className="text-green-400">
               ₹{payments.reduce((total, p) => total + p.amount, 0)} Raised
            </span>
          </div>
        </div>

        {/* --- Two Column Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Supporters Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-8 flex flex-col h-[500px]">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
              Top Supporters
            </h2>
            
            {/* ✅ ADDED custom-scrollbar CLASS HERE */}
            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar space-y-4">
              {payments.length > 0 ? (
                payments.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30 hover:bg-slate-800/60 transition-colors">
                    <div className="relative flex-shrink-0">
                      <Image
                        width={40}
                        height={40}
                        src="/avatar.gif"
                        alt="avatar"
                        className="rounded-full aspect-square object-cover" 
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-[10px] font-bold px-1.5 rounded-full text-black">
                        ₹
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-semibold text-slate-200 truncate">
                          {p.name}
                        </h4>
                        <span className="font-bold text-green-400 text-sm">
                          ₹{p.amount}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 break-words line-clamp-2">
                        {p.message || "No message"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                 <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <span className="text-4xl mb-2">🌱</span>
                    <p>No supporters yet. Be the first!</p>
                 </div>
              )}
            </div>
          </div>

          {/* Right: Payment Form Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-8">
             <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Make a Donation
            </h2>

            <div className="flex flex-col gap-5">
              <div className="relative">
                 <input
                  onChange={handleChange}
                  value={paymentForm.name}
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-4 placeholder-slate-400 transition-all outline-none"
                />
              </div>

              <div className="relative">
                <input
                  onChange={handleChange}
                  value={paymentForm.message}
                  name="message"
                  type="text"
                  placeholder="Your Message (Optional)"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-4 placeholder-slate-400 transition-all outline-none"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold">₹</span>
                </div>
                <input
                  onChange={handleChange}
                  value={paymentForm.amount}
                  name="amount"
                  type="number"
                  placeholder="Enter Amount"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white text-lg font-bold rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-10 p-4 placeholder-slate-500 transition-all outline-none"
                />
              </div>

              <div className="flex gap-3">
                 {[50, 100, 200, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setpaymentForm({ ...paymentForm, amount: amt.toString() });
                      }}
                      className="flex-1 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-500 rounded-lg text-sm font-medium transition-all"
                    >
                      ₹{amt}
                    </button>
                 ))}
              </div>

              {error && <div className="text-red-400 text-sm font-medium bg-red-900/20 p-3 rounded-lg border border-red-500/20">{error}</div>}

              <div className="mt-2">
                {!session ? (
                   <button
                    type="button"
                    onClick={() => router.replace("/signup")}
                    className="w-full text-white bg-slate-700 hover:bg-slate-600 font-bold rounded-xl text-lg px-5 py-4 text-center transition-all"
                  >
                    Login to Donate
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => pay(Number(paymentForm.amount) * 100)}
                    disabled={!paymentForm.amount || !paymentForm.name}
                    className="w-full text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-bold rounded-xl text-lg px-5 py-4 text-center shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;