import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const LoginPage: React.FC = () => {
  const { isLoading, isAuthenticated, signinRedirect } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      signinRedirect();
    }
  }, [isLoading, isAuthenticated, signinRedirect]);

  return <div>Redirecting to login...</div>;
};

export default LoginPage;
