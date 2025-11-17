import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { Header } from "./components/Layout/Header";
import { TabNavigation } from "./components/Layout/TabNavigation";
import { GameCatalogueTab } from "./components/GameCatalogue/GameCatalogueTab";
import { UserServiceTab } from "./components/UserService/UserServiceTab";
import { ReviewServiceTab } from "./components/ReviewService/ReviewServiceTab";

function App() {
  const [activeTab, setActiveTab] = useState("gameCatalogue");
  const auth = useAuth();

  const tabs = [
    { id: "gameCatalogue", label: "Game Catalogue" },
    { id: "userService", label: "User Service" },
    { id: "reviewService", label: "Review Service" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "gameCatalogue":
        return <GameCatalogueTab />;
      case "userService":
        return <UserServiceTab auth={auth} />;
      case "reviewService":
        return <ReviewServiceTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-secondary)">
      <Header auth={auth} />
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />
      <main className="pb-8 max-w-4xl mx-auto">{renderTabContent()}</main>
    </div>
  );
}

export default App;
