import Web3 from "web3";
import { EventData } from "web3-eth-contract/types";

type DaiTransfer = {
    hash: string;
    blockNumber: number;
    logIndex: number;
    timestamp: number;
    amount: number;
    from: string;
    to: string;
};

export const daiTransferFromEvent = (e: EventData) => {
    return {
        hash: e.transactionHash,
        blockNumber: e.blockNumber,
        logIndex: e.logIndex,
        timestamp: 0,
        amount: Number(Web3.utils.fromWei(e.returnValues.wad, "ether")), // standard notation: value
        from: e.returnValues.src, // standard notation: from
        to: e.returnValues.dst, // standard notation: to
    };
};

export const compareDaiTransfers = (
    a: DaiTransfer | EventData,
    b: DaiTransfer | EventData
) => {
    return a.blockNumber === b.blockNumber && a.logIndex === b.logIndex;
};

export default DaiTransfer;
