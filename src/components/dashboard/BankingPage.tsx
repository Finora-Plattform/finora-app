import { memo } from "react";
import { FiGrid } from "react-icons/fi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AccountGroups } from "./AccountGroups";
import { BankAccount } from "@/lib/mock-data";

interface BankingPageProps {
  accounts: BankAccount[];
  onAccountsUpdate?: () => void;
}

const BankingPage = memo(({ accounts, onAccountsUpdate }: BankingPageProps) => {
  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kontenübersicht</CardTitle>
        <div className="flex items-center space-x-2 text-gray-400">
          <FiGrid className="w-5 h-5" />
          <span>{accounts.length} Konten</span>
        </div>
      </CardHeader>
      <CardContent>
        <AccountGroups accounts={accounts} onAccountsUpdate={onAccountsUpdate} />
      </CardContent>
    </Card>
  );
});

BankingPage.displayName = "BankingPage";

export { BankingPage }; 