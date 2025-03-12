import { memo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = memo(({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full sm:w-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center space-x-2"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
});

TabNavigation.displayName = "TabNavigation";

export { TabNavigation }; 