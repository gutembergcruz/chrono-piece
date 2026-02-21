import { Header } from "@/Components/Header";
import { Sidebar } from "@/Components/Sidebar";
import { MainContent } from "@/Components/MainContent";
import "./page.scss";

export default function Home() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
