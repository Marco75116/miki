import Image from "next/image";
import React from "react";
import ethLogo from "@/lib/assets/tokens/ethereum.png";
import daiLogo from "@/lib/assets/tokens/dai.png";
import usdtLogo from "@/lib/assets/tokens/usdt.png";

type ImageTokenList = {
	symbol: string | undefined;
};
const ImageTokenList = ({ symbol }: ImageTokenList) => {
	if (symbol === "WETH") {
		return <Image src={ethLogo} alt="token img" height={20} />;
	}
	if (symbol === "DAI") {
		return <Image src={daiLogo} alt="token img" height={20} />;
	}
	if (symbol === "USDT") {
		return <Image src={usdtLogo} alt="token img" height={20} />;
	}
};

export default ImageTokenList;
