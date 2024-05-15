import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TransactionAction } from "../types/global.type";

export const useTimeDelayToast = (
  isFetching: boolean,
  hash: `0x${string}` | undefined
) => {
  const [lastTxSubmitted, SetLastTxSubmitted] = useState<TransactionAction>({
    action: "approve",
    symbolFrom: "",
  });
  const [timeDelay, setTimeDelay] = useState(false);
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let timer: any;
    if (isFetching) {
      setTimeDelay(true);
    } else if (!isFetching && timeDelay) {
      timer = setTimeout(() => {
        setTimeDelay(false);

        const desc =
          lastTxSubmitted.action === "approve"
            ? `Approve ${lastTxSubmitted.symbolFrom} `
            : lastTxSubmitted.action === "swap"
            ? `Swap ${lastTxSubmitted.symbolFrom} for ${lastTxSubmitted.symbolTo}.`
            : lastTxSubmitted.action === "add"
            ? `Add liquidity Pair ${lastTxSubmitted.symbol0}/${lastTxSubmitted.symbol1}`
            : `Remove liquidity Pair ${lastTxSubmitted.symbol0}/${lastTxSubmitted.symbol1}`;
        console.log(desc);

        toast("Transaction successfully submitted!", {
          className: "success",
          description: desc,
          action: {
            label: "View",
            onClick: () => {
              window.open(
                `https://juicy-low-small-testnet.explorer.testnet.skalenodes.com/tx/${hash}`,
                "_blank"
              );
            },
          },
        });
        console.log("after");
      }, 2000);
    }

    return () => clearTimeout(timer); // Cleanup the timer
  }, [isFetching, timeDelay, hash, lastTxSubmitted]);

  return { timeDelay, SetLastTxSubmitted };
};
