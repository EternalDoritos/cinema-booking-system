import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Paynow = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("../StaffScreen");
    }, 3000);
  }, [router]);
  return (
    <div className="bg-black flex flex-col items-center justify-center py-6 sm:px-6 lg:px-8">
      <h1 className="text-white text-center text-3xl py-10 font-bold uppercase tracking-wider">
        Scan QR below for payment
      </h1>
      <QRCodeSVG
        value={"http://localhost:3000/PurchaseSuccessScreen"}
        size={250}
        level="L"
      />
    </div>
  );
};

export default Paynow;
