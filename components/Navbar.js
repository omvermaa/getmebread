


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useSession, signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { fetchuser } from "@/actions/useractions";
// import {
//   UserIcon,
//   SettingsIcon,
//   LockIcon,
//   BellIcon,
//   LogoutIcon,
// } from "./icons/DropdownIcons";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [showDropDown, setDropDown] = useState(false);
//   const [username, setusername] = useState(null);
//   const dropdownRef = useRef(null);

//   const getusername = async () => {
//     if (session?.user?.email) {
//       const user = await fetchuser(session.user.email);
//       setusername(user?.username);
//     }
//   };

//   useEffect(() => {
//     if (session) {
//       getusername();
//     }
//     const handleUserUpdate = () => getusername();
//     window.addEventListener("userUpdated", handleUserUpdate);
    
//     // Close dropdown when clicking outside
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropDown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       window.removeEventListener("userUpdated", handleUserUpdate);
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [session]);

//   return (
//     <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        
//         {/* Logo Section */}
//         <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
//           <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
//              <Image
//                 src="/bread.gif"
//                 alt="Logo"
//                 width={24}
//                 height={24}
//                 className="w-6 h-6 object-contain"
//                 unoptimized
//              />
//           </div>
//           <span className="self-center text-xl font-bold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-all">
//             GetMeBread
//           </span>
//         </Link>

//         {/* Right Side Actions */}
//         <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse" ref={dropdownRef}>
//           {session ? (
//             <div className="relative">
//               <button
//                 onClick={() => setDropDown(!showDropDown)}
//                 className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white rounded-full px-3 py-1.5 transition-all duration-200 group focus:ring-4 focus:ring-purple-900/30"
//               >
//                 <div className="relative w-7 h-7 overflow-hidden rounded-full ring-2 ring-purple-500/50 group-hover:ring-purple-500 transition-all">
//                    <Image
//                       src={session.user.image || "/avatar.gif"}
//                       alt="User"
//                       fill
//                       className="object-cover"
//                    />
//                 </div>
//                 <span className="hidden sm:block text-sm font-medium text-slate-200 group-hover:text-white">
//                   {session.user.name?.split(" ")[0]}
//                 </span>
//                 <svg
//                   className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showDropDown ? "rotate-180" : ""}`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {/* Dropdown Menu */}
//               <div
//                 className={`absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 transform origin-top-right transition-all duration-200 ease-out ${
//                   showDropDown
//                     ? "opacity-100 scale-100 translate-y-0"
//                     : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
//                 }`}
//               >
//                 {/* User Info Header */}
//                 <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-800/30 rounded-t-2xl">
//                   <p className="text-sm text-white font-semibold truncate">{session.user.name}</p>
//                   <p className="text-xs text-slate-400 truncate font-medium mt-0.5">{session.user.email}</p>
//                 </div>

//                 {/* Menu Items */}
//                 <ul className="py-2 px-2">
//                   {[
//                     { href: "/dashboard", icon: <UserIcon />, label: "Dashboard" },
//                     { href: username ? `/${username}` : "#", icon: <LockIcon />, label: "Your Page" },
//                     { href: "/notification", icon: <BellIcon />, label: "Notifications" },
//                     { href: "/settings", icon: <SettingsIcon />, label: "Settings" },
//                   ].map((item, idx) => (
//                     <li key={idx}>
//                       <Link
//                         href={item.href}
//                         onClick={() => setDropDown(false)}
//                         className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800 hover:text-white transition-colors group"
//                       >
//                         <span className="text-slate-400 group-hover:text-purple-400 transition-colors">
//                             {item.icon}
//                         </span>
//                         {item.label}
//                       </Link>
//                     </li>
//                   ))}
                  
//                   <div className="h-px bg-slate-700/50 my-2 mx-2"></div>

//                   <li>
//                     <button
//                       onClick={() => signOut()}
//                       className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-colors group"
//                     >
//                        <span className="text-red-400/70 group-hover:text-red-400 transition-colors">
//                          <LogoutIcon />
//                        </span>
//                       Sign out
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <Link href="/signup">
//               <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
//                 <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-slate-900 rounded-md group-hover:bg-opacity-0 font-semibold">
//                   Log In / Sign Up
//                 </span>
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirection
import { fetchuser, searchUsers } from "@/actions/useractions"; // Import searchUsers
import {
  UserIcon,
  SettingsIcon,
  LockIcon,
  BellIcon,
  LogoutIcon,
} from "./icons/DropdownIcons";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropDown, setDropDown] = useState(false);
  const [username, setusername] = useState(null);
  
  // --- Search States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDrop, setShowSearchDrop] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null); // Ref for search container
  const router = useRouter();

  const getusername = async () => {
    if (session?.user?.email) {
      const user = await fetchuser(session.user.email);
      setusername(user?.username);
    }
  };

  useEffect(() => {
    if (session) {
      getusername();
    }
    const handleUserUpdate = () => getusername();
    window.addEventListener("userUpdated", handleUserUpdate);
    
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      // User Dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
      // Search Dropdown
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [session]);

  // --- Search Logic (Debounced) ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        setShowSearchDrop(true);
        const results = await searchUsers(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setShowSearchDrop(false);
      }
    }, 500); // Wait 500ms after typing stops

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);


  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3 gap-4">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse group shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
             <Image
                src="/bread.gif"
                alt="Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
                unoptimized
             />
          </div>
          <span className="self-center text-xl font-bold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-all hidden sm:block">
            GetMeBread
          </span>
        </Link>

        {/* --- SEARCH BAR SECTION --- */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => { if(searchResults.length > 0) setShowSearchDrop(true) }}
                    className="block w-full p-2.5 pl-10 text-sm text-white border border-slate-700 rounded-full bg-slate-900/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-slate-400 outline-none transition-all" 
                    placeholder="Search creators..." 
                    suppressHydrationWarning
                />
                 {/* Loading Spinner inside input */}
                 {isSearching && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* --- Search Results Dropdown --- */}
            {showSearchDrop && searchQuery && (
                <div className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((user) => (
                                <li key={user.username}>
                                    <div 
                                        onClick={() => {
                                            router.push(`/${user.username}`);
                                            setShowSearchDrop(false);
                                            setSearchQuery(""); // Clear search after click
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer transition-colors border-b border-slate-800 last:border-0"
                                    >
                                        <Image 
                                            src={user.profilePic || "/avatar.gif"} 
                                            width={32} 
                                            height={32} 
                                            alt={user.username} 
                                            className="rounded-full object-cover w-8 h-8 bg-slate-700"
                                        />
                                        <div>
                                            <div className="text-sm font-semibold text-white">{user.name}</div>
                                            <div className="text-xs text-slate-400">@{user.username}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !isSearching && (
                            <div className="px-4 py-3 text-sm text-slate-400 text-center">
                                No users found
                            </div>
                        )
                    )}
                </div>
            )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse shrink-0" ref={dropdownRef}>
          {session ? (
            <div className="relative">
              <button
                onClick={() => setDropDown(!showDropDown)}
                className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white rounded-full px-3 py-1.5 transition-all duration-200 group focus:ring-4 focus:ring-purple-900/30"
              >
                <div className="relative w-7 h-7 overflow-hidden rounded-full ring-2 ring-purple-500/50 group-hover:ring-purple-500 transition-all">
                   <Image
                      src={session.user.image || "/avatar.gif"}
                      alt="User"
                      fill
                      className="object-cover"
                   />
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-200 group-hover:text-white">
                  {session.user.name?.split(" ")[0]}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showDropDown ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 transform origin-top-right transition-all duration-200 ease-out ${
                  showDropDown
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* User Info Header */}
                <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-800/30 rounded-t-2xl">
                  <p className="text-sm text-white font-semibold truncate">{session.user.name}</p>
                  <p className="text-xs text-slate-400 truncate font-medium mt-0.5">{session.user.email}</p>
                </div>

                {/* Menu Items */}
                <ul className="py-2 px-2">
                  {[
                    { href: "/dashboard", icon: <UserIcon />, label: "Dashboard" },
                    { href: username ? `/${username}` : "#", icon: <LockIcon />, label: "Your Page" },
                    { href: "/notification", icon: <BellIcon />, label: "Notifications" },
                    { href: "/settings", icon: <SettingsIcon />, label: "Settings" },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setDropDown(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800 hover:text-white transition-colors group"
                      >
                        <span className="text-slate-400 group-hover:text-purple-400 transition-colors">
                            {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  
                  <div className="h-px bg-slate-700/50 my-2 mx-2"></div>

                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-colors group"
                    >
                       <span className="text-red-400/70 group-hover:text-red-400 transition-colors">
                         <LogoutIcon />
                       </span>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/signup">
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
                <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-slate-900 rounded-md group-hover:bg-opacity-0 font-semibold">
                  Log In / Sign Up
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;