export const Players = {
  "General players": [
    // Arsenal
    "Mesut Özil",
    "Alexis Sánchez",
    "Olivier Giroud",
    // Add more players here
  ],
};

// Add a type for better type safety
export type PlayerEra = keyof typeof Players;
