import { memo } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = memo(({ title, value, icon }: StatCardProps) => (
  <Card variant="glass" className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className="p-3 bg-blue-500/20 rounded-lg">{icon}</div>
    </div>
  </Card>
));

StatCard.displayName = "StatCard";

export { StatCard }; 