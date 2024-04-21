import { createConfig, http } from "wagmi";
import { skaleEuropa } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECTID as string;

export const config = createConfig({
  chains: [skaleEuropa],
  connectors: [walletConnect({ projectId })],
  transports: {
    [skaleEuropa.id]: http(),
  },
});
