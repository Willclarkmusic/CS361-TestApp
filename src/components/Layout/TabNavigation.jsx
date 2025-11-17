export const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  console.log("active tab:", activeTab);

  return (
    <div className="border-y-2 bg-white sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex gap-0 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                console.log("Tab changed to:", tab.id);
              }}
              className={`
                px-6 py-4 font-bold border-r-2 border-black transition-all
                ${
                  activeTab == tab.id
                    ? " bg-(--accent-primary) text-green-600"
                    : " bg-white hover:bg-gray-100"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
