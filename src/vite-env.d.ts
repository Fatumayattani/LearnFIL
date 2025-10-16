/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    isMetaMask?: boolean;
  };
  avalanche?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    isAvalanche?: boolean;
  };
}
