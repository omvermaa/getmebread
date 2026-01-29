import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { fetchuserbyUsername } from "@/actions/useractions";
import { notFound } from "next/navigation";

const Username = async ({ params }) => {
  
  const resolvedParams = await params;
  
  const u = await fetchuserbyUsername(resolvedParams.username);
  if (!u) {
    return notFound();
  }
  
  // if user exists, render
  return (
    <>
      <PaymentPage username={resolvedParams.username} />
    </>
  );
};

export default Username;