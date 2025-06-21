import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen w-full">
      <Sidebar />
      <div id="main-content" className="flex flex-col ml-64">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
