import { useState, useEffect, useMemo, useCallback, memo } from "react";
import {
  FiLogOut,
  FiDollarSign,
  FiGrid,
  FiTrendingUp,
  FiTrendingDown,
  FiCreditCard,
  FiFileText,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "./StatCard";
import { AccountGroups } from "./AccountGroups";
import { TabNavigation } from "../navigation/TabNavigation";
import { BankingPage } from "./BankingPage";
import { PlaidLink } from "./PlaidLink";
import { 
  mockApiService, 
  BankAccount, 
  User 
} from "@/lib/mock-data";

type DashboardData = {
  accounts: BankAccount[];
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [needsPlaidSetup, setNeedsPlaidSetup] = useState(false);

  const tabs = useMemo(
    () => [
      {
        id: "overview",
        label: "Übersicht",
        icon: <FiGrid className="w-4 h-4" />,
      },
      {
        id: "accounts",
        label: "Bankkonten",
        icon: <FiCreditCard className="w-4 h-4" />,
      },
      {
        id: "contracts",
        label: "Verträge",
        icon: <FiFileText className="w-4 h-4" />,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await mockApiService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    
    fetchUser();
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call
      const data = await mockApiService.getDashboardData();
      
      setDashboardData(data);
      setNeedsPlaidSetup(data.accounts.length === 0);
    } catch (err) {
      setError("Fehler beim Laden der Daten");
      console.error("Dashboard Fehler:", err);
      setNeedsPlaidSetup(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLogout = useCallback(() => {
    // In a real app, this would call an auth service
    console.log("Logging out...");
  }, []);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }, []);

  const renderOverview = useCallback(() => {
    if (needsPlaidSetup) {
      return (
        <Card variant="glass">
          <CardContent className="space-y-6 text-center py-8">
            <h2 className="text-xl font-semibold text-white">
              Willkommen bei Finora!
            </h2>
            <p className="text-gray-300">
              Um Ihre Finanzen zu verwalten, verbinden Sie bitte
              zuerst Ihr Bankkonto.
            </p>
            <PlaidLink onSuccess={fetchDashboardData} />
          </CardContent>
        </Card>
      );
    }

    if (!dashboardData) return null;
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Gesamtvermögen"
            value={formatCurrency(dashboardData.totalBalance)}
            icon={<FiDollarSign className="w-6 h-6 text-blue-400" />}
          />
          <StatCard
            title="Monatliche Einnahmen"
            value={formatCurrency(dashboardData.monthlyIncome)}
            icon={<FiTrendingUp className="w-6 h-6 text-green-400" />}
          />
          <StatCard
            title="Monatliche Ausgaben"
            value={formatCurrency(dashboardData.monthlyExpenses)}
            icon={<FiTrendingDown className="w-6 h-6 text-red-400" />}
          />
        </div>

        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Kontenübersicht</CardTitle>
            <div className="flex items-center space-x-2 text-gray-400">
              <FiGrid className="w-5 h-5" />
              <span>{dashboardData.accounts.length} Konten</span>
            </div>
          </CardHeader>
          <CardContent>
            <AccountGroups
              accounts={dashboardData.accounts}
              onAccountsUpdate={fetchDashboardData}
            />
          </CardContent>
        </Card>
      </div>
    );
  }, [dashboardData, formatCurrency, needsPlaidSetup, fetchDashboardData]);

  const renderContracts = useCallback(() => {
    return (
      <Card variant="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Verträge</CardTitle>
          <div className="flex items-center space-x-2 text-gray-400">
            <FiFileText className="w-5 h-5" />
            <span>0 Verträge</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Keine Verträge vorhanden</p>
        </CardContent>
      </Card>
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md bg-black/30 border-b border-gray-800 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex-shrink-0"
            >
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.svg" 
                  alt="Finora Logo" 
                  className="h-8 w-8 rounded-full"
                />
                <h1 className="text-xl font-semibold text-white">
                  Finora
                </h1>
              </div>
            </motion.div>
            <div className="flex items-center space-x-4">
              {user && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-300"
                >
                  {user.firstName} {user.lastName}
                </motion.span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FiLogOut className="mr-2" />
                <span>Abmelden</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && renderOverview()}
            {activeTab === "accounts" && (
              <BankingPage
                accounts={dashboardData?.accounts || []}
                onAccountsUpdate={fetchDashboardData}
              />
            )}
            {activeTab === "contracts" && renderContracts()}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Dashboard; 