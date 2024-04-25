import { mockTokenData } from "../constants/constant.global";

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const copyToClipboard = async (text?: string): Promise<void> => {
  try {
    if (text) {
      return navigator.clipboard.writeText(text);
    }
  } catch (error) {
    throw new Error("Error while copying address");
  }
};

export const displayDecimalNumber = (
  weiBalanceBigInt: bigint,
  decimals: number
) => {
  let weiBalanceStr = weiBalanceBigInt.toString();
  weiBalanceStr = weiBalanceStr.padStart(decimals + 1, "0");

  const position = weiBalanceStr.length - decimals;
  const etherStr = `${weiBalanceStr.substring(
    0,
    position
  )}.${weiBalanceStr.substring(position)}`;

  const trimmedEtherStr = etherStr.replace(/\.?0+$/, "");

  return trimmedEtherStr;
};

export const stringToBigIntWithDecimals = (
  amountStr: string,
  decimalPlaces: number
) => {
  const dotIndex = amountStr.indexOf(".");
  let integralPart = amountStr;
  let fractionalPart = "";

  if (dotIndex !== -1) {
    integralPart = amountStr.substring(0, dotIndex);
    fractionalPart = amountStr.substring(dotIndex + 1);
  }

  if (fractionalPart.length > decimalPlaces) {
    fractionalPart = fractionalPart.substring(0, decimalPlaces);
  } else {
    fractionalPart = fractionalPart.padEnd(decimalPlaces, "0");
  }

  const combined = integralPart + fractionalPart;

  return BigInt(combined);
};

export const toFormattedPercentage = (
  num: number | undefined,
  decimals: number | undefined
) => {
  try {
    if (num !== undefined && num !== null && !isNaN(num.valueOf())) {
      let formattedNumber = (num * 100).toFixed(decimals || 0);

      if (decimals !== undefined) {
        formattedNumber = parseFloat(formattedNumber).toString();
      }

      return `${formattedNumber}%`;
    } else {
      return "--";
    }
  } catch (error) {
    console.log("toFormattedPercentage failed : " + error);
  }
};

export const formatNumber = (
  num: number | undefined,
  decimals?: number
): string => {
  try {
    if (num !== undefined && num !== null && !isNaN(num)) {
      const isBigNumber = num > 999999;

      return new Intl.NumberFormat("en-US", {
        notation: isBigNumber ? "compact" : undefined,
        minimumFractionDigits: decimals || 0,
        maximumFractionDigits: decimals || 0,
      }).format(num);
    } else {
      return "0";
    }
  } catch (error) {
    throw new Error("securdFormat failed : " + error);
  }
};

export const getRelativeTime = (timestamp: number) => {
  const now = new Date().getTime();
  const diff = timestamp * 1000 - now;
  const units = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  };

  if (diff < units.minute) {
    return "Unlocked";
  } else if (diff < units.hour) {
    return `${Math.floor(diff / units.minute)} minutes`;
  } else if (diff < units.day) {
    return `${Math.floor(diff / units.hour)} hours`;
  } else if (diff < units.month) {
    return `${Math.floor(diff / units.day)} days`;
  } else if (diff < units.year) {
    return `${Math.floor(diff / units.month)} months`;
  } else {
    return `${Math.floor(diff / units.year)} years`;
  }
};

export const toMilli = (num: number) => {
  return num * 1000;
};

export const getMarketTokenFromSymbol = (symbol: string) => {
  return mockTokenData.find((token) => {
    return token.symbol === symbol;
  });
};
