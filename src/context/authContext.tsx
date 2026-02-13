"use client";

import { createContext, useContext, useState } from "react";

type Merchant = {
  id: string;
  email: string;
  companyName: string;
};

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [merchant, setMerchant] = useState<Merchant | null>(null);

  return (
    <AuthContext.Provider value={{ merchant, setMerchant }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
