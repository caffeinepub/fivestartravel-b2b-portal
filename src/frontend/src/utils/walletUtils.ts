const WALLET_KEY = "fstwallet";
const INITIAL_BALANCE = 124800;

export function getWalletBalance(): number {
  const stored = localStorage.getItem(WALLET_KEY);
  if (stored === null) {
    localStorage.setItem(WALLET_KEY, String(INITIAL_BALANCE));
    return INITIAL_BALANCE;
  }
  return Number.parseInt(stored, 10);
}

export function deductWalletBalance(amount: number): number {
  const current = getWalletBalance();
  const newBalance = Math.max(0, current - amount);
  localStorage.setItem(WALLET_KEY, String(newBalance));
  return newBalance;
}
