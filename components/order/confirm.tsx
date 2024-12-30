"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/app/hooks/useOrder";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import { Loader2 } from "lucide-react";

export default function Confirm() {
    const { selectedTime, currentSelectedSeat, } = useOrder();
    const [isPaying, setIsPaying] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const router = useRouter();

    const tableBookingCost = 50; // Example table booking cost
    const totalCost = tableBookingCost + 200;

    const handlePayment = () => {
        setIsPaying(true);

        // Simulate payment and confirmation
        setTimeout(() => {
            setIsPaying(false);
            setIsConfirmed(true);

            // Redirect after showing confirmation
            setTimeout(() => {
                router.push("/my-orders"); // Replace with your actual orders page
            }, 1000);
        }, 2000);
    };

    return (
        <div className="space-y-6 px-4 py-6">
            <div>
                <CardHeader>
                    <CardTitle>Payment for Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Selected Seat:</span> {currentSelectedSeat || "Not selected"}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Selected Time:</span> {selectedTime || "Not selected"}
                    </p>
                </CardContent>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cost Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="text-gray-700">
                            <span className="font-medium">Table Booking Cost:</span> ${tableBookingCost.toFixed(2)}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Food Cost:</span> ${200}
                        </p>
                        <p className="text-gray-900 font-medium">
                            Total: ${totalCost.toFixed(2)}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg"
                    onClick={handlePayment}
                >
                    Pay Now
                </Button>
            </div>

            {/* Payment Modal */}
            <Dialog open={isPaying}>
                <DialogContent className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-green-600" />
                    <p>Processing Payment...</p>
                </DialogContent>
            </Dialog>

            {/* Confirmation Modal */}
            <Dialog open={isConfirmed}>
                <DialogContent className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-xl font-semibold text-green-600">Table Confirmed!</p>
                    <p className="text-sm text-gray-600">
                        Redirecting to your orders...
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
}
