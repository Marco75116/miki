import { createConfig, http } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { skaleEuropaTestnet } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECTID as string;

export const config = createConfig({
	chains: [skaleEuropaTestnet],
	connectors: [walletConnect({ projectId })],
	transports: {
		[skaleEuropaTestnet.id]: http(),
	},
});
