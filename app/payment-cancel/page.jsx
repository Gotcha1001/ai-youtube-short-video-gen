"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const PaymentCancelPage = () => {
    return (
        <>
            <Head>
                <title>Payment Cancelled</title>
            </Head>

            <div className="relative flex flex-col items-center justify-center min-h-screen">
                {/* Background Image */}
                <Image
                    src="/cancel.jpg" // Place the image in the "public/images" folder
                    alt="Payment Cancelled Background"
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    className="-z-10"
                />

                {/* Content Box */}
                <div className="relative max-w-md mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden p-8 z-10">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                        Payment Cancelled
                    </h2>
                    <p className="text-lg text-gray-700 text-center mb-8">
                        Your payment was cancelled.
                    </p>
                    <div className="text-center">
                        <Link href="/dashboard" className="text-blue-600 hover:underline">
                            Back to the Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentCancelPage;
