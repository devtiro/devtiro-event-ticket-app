import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import {
  TicketValidationMethod,
  TicketValidationStatus,
} from "@/domain/domain";
import { AlertCircle, Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { validateTicket } from "@/lib/api";
import { useAuth } from "react-oidc-context";

const DashboardValidateQrPage: React.FC = () => {
  const { isLoading, user } = useAuth();
  const [isManual, setIsManual] = useState(false);
  const [data, setData] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [validationStatus, setValidationStatus] = useState<
    TicketValidationStatus | undefined
  >();

  const handleReset = () => {
    setIsManual(false);
    setData(undefined);
    setError(undefined);
    setValidationStatus(undefined);
  };

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else if (typeof err === "string") {
      setError(err);
    } else {
      setError("An unknown error occurred");
    }
  };

  const handleValidate = async (id: string, method: TicketValidationMethod) => {
    if (!user?.access_token) {
      return;
    }
    try {
      const response = await validateTicket(user.access_token, {
        id,
        method,
      });
      setValidationStatus(response.status);
    } catch (err) {
      handleError(err);
    }
  };

  if (isLoading || !user?.access_token) {
    <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div
        className="border border-gray-400 max-w-sm
w-full p-4"
      >
        {error && (
          <div className="min-h-screen bg-black text-white">
            <Alert variant="destructive" className="bg-gray-900 border-red-700">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        {/* Scanner Viewport */}
        <div className="rounded-lg overflow-hidden mx-auto mb-8 relative">
          <Scanner
            key={`scanner-${data}-${validationStatus}`}
            onScan={(result) => {
              if (result) {
                const qrCodeId = result[0].rawValue;
                setData(qrCodeId);
                handleValidate(qrCodeId, TicketValidationMethod.QR_SCAN);
              }
            }}
            onError={handleError}
          />

          {validationStatus && (
            <div className="absolute inset-0 flex items-center justify-center">
              {validationStatus === TicketValidationStatus.VALID ? (
                <div className="bg-green-500 rounded-full p-4">
                  <Check className="w-20 h-20" />
                </div>
              ) : (
                <div className="bg-red-500 rounded-full p-4">
                  <X className="w-20 h-20" />
                </div>
              )}
            </div>
          )}
        </div>

        {isManual ? (
          <div className="pb-8">
            <Input
              className="w-full text-white text-lg mb-8"
              onChange={(e) => setData(e.target.value)}
            />
            <Button
              className="bg-purple-500 w-full h-[80px] hover:bg-purple-800"
              onClick={() =>
                handleValidate(data || "", TicketValidationMethod.MANUAL)
              }
            >
              Submit
            </Button>
          </div>
        ) : (
          <div>
            <div className="border-white border-2 h-12 rounded-md font-mono flex justify-center items-center">
              <span>{data || "Scan for Result"}</span>
            </div>
            <Button
              className="bg-gray-900 hover:bg-gray-600 border-gray-500 border-2 w-full h-[80px] text-xl my-8"
              onClick={() => setIsManual(true)}
            >
              Manual
            </Button>
          </div>
        )}

        <Button
          className="bg-gray-500 hover:bg-gray-800 w-full h-[80px] text-xl my-8"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default DashboardValidateQrPage;
