import { useState } from "react";

export function useGuestOnboarding() {
  const [guest, setGuest] = useState<{ email?: string; timestamp: number } | null>(null);

  const start = (email?: string) => {
    setGuest({ email, timestamp: Date.now() });
  };

  const reset = () => setGuest(null);

  return { guest, start, reset };
}
