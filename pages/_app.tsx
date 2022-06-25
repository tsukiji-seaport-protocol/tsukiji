import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";

const { chains, provider } = configureChains(
  [chain.rinkeby, chain.mainnet, chain.polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        // http: chain.rpcUrls.default,
        http: "https://eth-rinkeby.alchemyapi.io/v2/TrV45RvXdr025n8XUskersaTbPmVzVfo",
      }),
    }),
  ]
);

const wagmiClient = createClient({
  autoConnect: false,
  provider,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // prevent hydration UI bug: https://blog.saeloun.com/2021/12/16/hydration.html
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  console.log("heree");
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
