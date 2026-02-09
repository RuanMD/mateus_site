import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center px-4">
          <h1 className="mb-4 text-6xl font-display font-bold text-primary">404</h1>
          <p className="mb-2 text-2xl font-semibold text-foreground">Página não encontrada</p>
          <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button asChild size="lg">
            <Link to="/">Voltar para Início</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
