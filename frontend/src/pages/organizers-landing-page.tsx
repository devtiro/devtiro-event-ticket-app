import { Button } from "@/components/ui/button";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const OrganizersLandingPage: React.FC = () => {
  const { isAuthenticated, isLoading, signinRedirect, signoutRedirect } =
    useAuth();

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Nav */}
      <div className="flex justify-end p-4 container mx-auto">
        {isAuthenticated ? (
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/dashboard/events")}
              className="cursor-pointer"
            >
              Dashboard
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => signoutRedirect()}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button className="cursor-pointer" onClick={() => signinRedirect()}>
              Log in
            </Button>
          </div>
        )}
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              Create, Manage, and Sell Events Tickets with Ease
            </h1>
            <p className="text-xl">
              A complete platform for event organizers to create events, sell
              tickets, and validate attendees with QR Codes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/events")}
              >
                Create an Event
              </Button>
              <Button>Browse Events</Button>
            </div>
          </div>
          {/* Right Column */}
          <div className="bg-gray-600 rounded-lg aspect-square w-full max-w-sm overflow-hidden">
            <img
              src="organizers-landing-hero.png"
              alt="A busy concert"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizersLandingPage;
