export const timestampAbi = [
  // Opción común: safeMint(to, uri)
  {
    "type": "function",
    "name": "safeMint",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "uri", "type": "string" }
    ],
    "outputs": []
  },

  // Si tiene exactamente mintWithURI(to, uri), dejamos:
  {
    "type": "function",
    "name": "mintWithURI",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "uri", "type": "string" }
    ],
    "outputs": []
  },

  // (Opcional) tokenURI(tokenId) - útil para debug
  {
    "type": "function",
    "name": "tokenURI",
    "stateMutability": "view",
    "inputs": [{ "name": "tokenId", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "string" }]
  }
] as const;
