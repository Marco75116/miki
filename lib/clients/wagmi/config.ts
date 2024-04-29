import { createConfig, http } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { europaLiquidityHub } from "./europaLiquidityHub";

const projectId = process.env.NEXT_PUBLIC_WALLECT_CONNECT_PROJECTID as string;

export const config = createConfig({
	chains: [europaLiquidityHub],
	connectors: [walletConnect({ projectId })],
	transports: {
		[europaLiquidityHub.id]: http(),
	},
});
