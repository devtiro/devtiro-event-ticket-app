import { useRoles } from "@/hooks/use-roles";
import { useNavigate } from "react-router";

const DashboardPage: React.FC = () => {
  const { isLoading, isOrganizer, isStaff } = useRoles();
  const navigate = useNavigate();

  if (isLoading) {
    <p>Loading...</p>;
  }

  if (isOrganizer) {
    navigate("/dashboard/events");
    return;
  }

  if (isStaff) {
    navigate("/dashboard/validate-qr");
    return;
  }

  navigate("/dashboard/tickets");

  return <p>Loading...</p>;
};

export default DashboardPage;
