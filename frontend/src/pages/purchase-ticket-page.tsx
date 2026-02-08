import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { purchaseTicket } from "@/lib/api";
import { CheckCircle, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router";

const PurchaseTicketPage: React.FC = () => {
  const { eventId, ticketTypeId } = useParams();
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();
  const [isPurchaseSuccess, setIsPurchaseASuccess] = useState(false);

  useEffect(() => {
    if (!isPurchaseSuccess) {
      return;
    }
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPurchaseSuccess]);

  const handlePurchase = async () => {
    if (isLoading || !user?.access_token || !eventId || !ticketTypeId) {
      return;
    }
    try {
      await purchaseTicket(user.access_token, eventId, ticketTypeId);
      setIsPurchaseASuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (isPurchaseSuccess) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center">
        <div className="max-w-md mx-auto p-8 text-center">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-black">
            <div className="space-y-2">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-600">Thank you!</h2>
              <p className="text-gray-600">
                Your ticket purchase was successful.
              </p>
              <p className="text-gray-600 text-sm">
                Redirecting to home page in a few seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-md mx-auto py-20">
        <div className="bg-white border-gray-300 shadow-sm border rounded-lg space-y-4 p-6">
          {error && (
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="text-red-500 text-sm">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          {/* Credit Card Number */}
          <div className="space-y-2">
            <Label className="text-gray-600">Credit Card Number</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="bg-gray-200 text-black pl-10"
              />
              <CreditCard className="absolute h-4 w-4 text-gray-400 top-2.5 left-3" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600">Cardholder Name </Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="John Smith"
                className="bg-gray-200 text-black pl-10"
              />
              <CreditCard className="absolute h-4 w-4 text-gray-400 top-2.5 left-3" />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-purple-500 hover:bg-purple-800 cursor-pointer"
              onClick={handlePurchase}
            >
              Purchase Ticket
            </Button>
          </div>

          <div className="text-gray-500 text-xs flex items-center justify-center">
            This is a mock page, no payment details should be entered.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketPage;
