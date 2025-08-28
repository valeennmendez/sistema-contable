import { useEffect } from "react";
import { authStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { checkAuth } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await checkAuth();
        if (res.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al chequear autenticación:", error);
        navigate("/login");
      }
    };

    fetchAuth();
  }, []);

  return (
    <div className="text-red-400 bg-base-100 min-h-[calc(100vh-4rem)]">
      HomePage
    </div>
  );
}

export default HomePage;
