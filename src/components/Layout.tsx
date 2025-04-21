import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-blue-600 text-xl font-bold">
                  Gestor de Tareas
                </Link>
              </div>
              <div className="ml-6 flex space-x-4 items-center">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tareas
                </Link>
                <Link
                  to="/tasks/new"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium font"
                >
                  Nueva Tarea
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
