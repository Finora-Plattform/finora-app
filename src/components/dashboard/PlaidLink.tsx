import { memo } from "react";
import { FiLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface PlaidLinkProps {
  onSuccess: () => void;
}

const PlaidLink = memo(({ onSuccess }: PlaidLinkProps) => {
  const handleConnect = () => {
    // In a real implementation, this would open the Plaid Link
    // For now, we'll just simulate success
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <Button 
      onClick={handleConnect}
      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
    >
      <FiLink className="w-4 h-4" />
      <span>Bankkonto verbinden</span>
    </Button>
  );
});

PlaidLink.displayName = "PlaidLink";

export { PlaidLink }; 