import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/sessionWrapper";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GetMeBread",
  description: "A platform to help you get funding for your projects.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-white relative pt-20 md:pt-24`}
      >
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="relative h-full w-full bg-slate-950 [&>div]:absolute [&>div]:bottom-0 [&>div]:right-[-20%] [&>div]:top-[-10%] [&>div]:h-[500px] [&>div]:w-[500px] [&>div]:rounded-full [&>div]:bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
            <div></div>
          </div>
        </div>
        <SessionWrapper>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </SessionWrapper>
        <Script
          src="https://cdn.jsdelivr.net/npm/flowbite@latest/dist/flowbite.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}


// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import SessionWrapper from "@/components/sessionWrapper";
// import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "GetMeFunding",
//   description: "A platform to help you get funding for your projects.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-white relative`}
//         suppressHydrationWarning={true}
//       >
//         {/* --- Background Pattern Start --- */}
//         <div className="fixed inset-0 -z-10 pointer-events-none">
//           <div className="relative h-full w-full bg-slate-950 [&>div]:absolute [&>div]:bottom-0 [&>div]:right-[-20%] [&>div]:top-[-10%] [&>div]:h-[500px] [&>div]:w-[500px] [&>div]:rounded-full [&>div]:bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
//             <div></div>
//           </div>
//         </div>
//         {/* --- Background Pattern End --- */}

//         <SessionWrapper>
//           {/* Added 'relative z-10' to Navbar to ensure it stays clickable above background */}
//           <div className="relative z-10">
//             <Navbar />
//           </div>

//           <main className="min-h-screen relative z-10">
//             {children}
//           </main>

//           <Footer />
//         </SessionWrapper>

//         <Script
//           src="https://cdn.jsdelivr.net/npm/flowbite@latest/dist/flowbite.min.js"
//           strategy="lazyOnload"
//         />
//       </body>
//     </html>
//   );
// }