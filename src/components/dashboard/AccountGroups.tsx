import { memo } from "react";
import { BankAccount } from "@/lib/mock-data";

interface AccountGroupsProps {
  accounts: BankAccount[];
  onAccountsUpdate?: () => void;
}

const AccountGroups = memo(({ accounts }: AccountGroupsProps) => {
  // Group accounts by type
  const accountsByType = accounts.reduce((groups, account) => {
    const type = account.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(account);
    return groups;
  }, {} as Record<string, BankAccount[]>);

  const formatCurrency = (value: number, currency: string = "EUR") => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {Object.entries(accountsByType).map(([type, accounts]) => (
        <div key={type} className="space-y-3">
          <h3 className="text-lg font-medium text-gray-300 capitalize">
            {type === "depository" ? "Konten" : type === "credit" ? "Kredite" : type}
          </h3>
          <div className="space-y-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    {account.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{account.name}</p>
                    <p className="text-sm text-gray-400">
                      {account.subtype === "checking"
                        ? "Girokonto"
                        : account.subtype === "savings"
                        ? "Sparkonto"
                        : account.subtype === "credit card"
                        ? "Kreditkarte"
                        : account.subtype}
                      {" • "}
                      ****{account.mask}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      account.balances.current < 0 ? "text-red-400" : "text-white"
                    }`}
                  >
                    {formatCurrency(account.balances.current, account.balances.iso_currency_code)}
                  </p>
                  {account.balances.available !== account.balances.current && (
                    <p className="text-sm text-gray-400">
                      Verfügbar: {formatCurrency(account.balances.available, account.balances.iso_currency_code)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

AccountGroups.displayName = "AccountGroups";

export { AccountGroups }; 