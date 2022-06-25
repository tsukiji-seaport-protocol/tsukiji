import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";

// rainbow + wagmi
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
  Theme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import merge from 'lodash.merge';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/Footer";

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

const { connectors } = getDefaultWallets({
  appName: 'tsukiji',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

// rainbow theme
const customTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#267c8e',
  },
} as Theme);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // prevent hydration UI bug: https://blog.saeloun.com/2021/12/16/hydration.html
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  console.log("heree");
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={customTheme}>
            <Component {...pageProps} />
            <Footer />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
