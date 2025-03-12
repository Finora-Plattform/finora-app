export type BankAccount = {
  id: string;
  name: string;
  mask: string;
  type: string;
  subtype: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
  };
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export const mockUser: User = {
  firstName: "Max",
  lastName: "Mustermann",
  email: "max.mustermann@example.com",
};

export const mockAccounts: BankAccount[] = [
  {
    id: "acc_1",
    name: "Girokonto",
    mask: "1234",
    type: "depository",
    subtype: "checking",
    balances: {
      available: 2540.75,
      current: 2540.75,
      iso_currency_code: "EUR",
    },
  },
  {
    id: "acc_2",
    name: "Sparkonto",
    mask: "5678",
    type: "depository",
    subtype: "savings",
    balances: {
      available: 15750.32,
      current: 15750.32,
      iso_currency_code: "EUR",
    },
  },
  {
    id: "acc_3",
    name: "Kreditkarte",
    mask: "9012",
    type: "credit",
    subtype: "credit card",
    balances: {
      available: 2000,
      current: -450.25,
      iso_currency_code: "EUR",
    },
  },
];

export const mockTransactions = [
  {
    id: "tx_1",
    accountId: "acc_1",
    amount: -42.99,
    date: "2023-11-15",
    name: "Amazon",
    category: "Shopping",
  },
  {
    id: "tx_2",
    accountId: "acc_1",
    amount: -65.30,
    date: "2023-11-14",
    name: "Supermarkt",
    category: "Groceries",
  },
  {
    id: "tx_3",
    accountId: "acc_1",
    amount: 1250.00,
    date: "2023-11-01",
    name: "Gehalt",
    category: "Income",
  },
  {
    id: "tx_4",
    accountId: "acc_2",
    amount: 500.00,
    date: "2023-11-02",
    name: "Überweisung Sparkonto",
    category: "Transfer",
  },
  {
    id: "tx_5",
    accountId: "acc_3",
    amount: -89.99,
    date: "2023-11-10",
    name: "Restaurant",
    category: "Food & Drink",
  },
];

export const mockMonthlyIncome = 3250.00;
export const mockMonthlyExpenses = 2175.45;

export const mockDashboardData = {
  accounts: mockAccounts,
  totalBalance: mockAccounts.reduce(
    (sum, account) => sum + account.balances.current,
    0
  ),
  monthlyIncome: mockMonthlyIncome,
  monthlyExpenses: mockMonthlyExpenses,
};

// Mock API service
export const mockApiService = {
  getCurrentUser: () => Promise.resolve(mockUser),
  getAccounts: () => Promise.resolve(mockAccounts),
  getDashboardData: () => Promise.resolve(mockDashboardData),
  getTransactions: () => Promise.resolve(mockTransactions),
}; 