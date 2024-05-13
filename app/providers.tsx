"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/clients/wagmi/config";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:4350/graphql",
	cache: new InMemoryCache(),
});

export function Providers({ children }: { children: ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<ApolloProvider client={client}>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider>{children}</TooltipProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</ApolloProvider>
	);
}
