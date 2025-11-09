import axios from 'axios';

export const fetchFromDexScreener = async (query: string) => {
  const url = `https://api.dexscreener.com/latest/dex/search?q=${query}`;

  try {
    const response = await axios.get(url);
    const data = response.data as any;
    const pairs = data.pairs || [];

    const tokens = pairs.map((pair: any) => ({
      token_address: pair?.baseToken?.address || 'N/A',
      token_name: pair?.baseToken?.name || 'Unknown',
      token_ticker: pair?.baseToken?.symbol || 'N/A',
      price_usd: pair?.priceUsd || 0,
      volume_24h_usd: pair?.volume?.h24 || 0,
      liquidity_usd: pair?.liquidity?.usd || 0,
      transaction_count:
        (pair?.txns?.h24?.buys || 0) + (pair?.txns?.h24?.sells || 0),
      protocol: pair?.dexId || 'N/A',
    }));

    return tokens;
  } catch (error: any) {
    console.error('Error fetching from DexScreener:', error.message);
    return [];
  }
};
