import { useEffect } from "react";
import { BlockHeader } from "web3-eth/types";
import Web3 from "web3";
import { EventData } from "web3-eth-contract/types";
import { EventEmitter } from "events";
import { useSelector, useDispatch } from "react-redux";
import { ALLOW_EVENT_LISTENERS } from "../constants";
import useWeb3 from "../hooks/useWeb3";
import { RootState } from "../state/store";
import { daiTransferFromEvent } from "../models/DaiTransfer";
import { addEntry } from "../state/DaiTransfersSlice";
import DaiAbi from "../abi/Dai.json";
import { DAI_ADDRESS, RPC_ENDPOINT_WSS } from "../constants";

const useDaiEventListener = () => {
    const { web3, dai } = useWeb3();

    const { fromFilter, toFilter, emitterFromBlock } = useSelector(
        (state: RootState) => state.application
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const newEventCallback = async (e: EventData) => {
            let d = daiTransferFromEvent(e);

            if (
                (fromFilter !== "" &&
                    d.from.toLowerCase() !== fromFilter.toLowerCase()) ||
                (toFilter !== "" &&
                    d.to.toLowerCase() !== toFilter.toLowerCase())
            ) {
                return;
            }

            let block: BlockHeader | null = null;
            for (let i = 0; i < 10; i++) {
                block = await web3.eth.getBlock(e.blockNumber, false);
                if (block === null) {
                    // for unfinalized blocks
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                } else break;
            }

            if (block !== null) {
                // Block probably dropped, dropping event.
                d.timestamp = Number(block.timestamp);
                dispatch(addEntry(d));
            }
        };

        if (emitterFromBlock <= 1) {
            return; // no starting before first fetch finished
        }

        const web3_ws = new Web3(RPC_ENDPOINT_WSS);
        const dai_ws = new web3_ws.eth.Contract(DaiAbi, DAI_ADDRESS);

        let emitter: EventEmitter;
        let connectedId: string = "";

        let isMounted = true;

        if (ALLOW_EVENT_LISTENERS) {
            emitter = dai_ws.events
                .Transfer({ fromBlock: emitterFromBlock })
                .on("data", (event: EventData) => newEventCallback(event))
                .on("connected", (str: string) => {
                    connectedId = str;
                    if (!isMounted) {
                        // @ts-ignore: Unsure about the type import from web3
                        emitter.options.requestManager.removeSubscription(
                            connectedId
                        );
                    }
                })
                .on("error", (err: string) => {
                    throw new Error("[EventListener] Emitter error: " + err);
                });
        }

        return () => {
            isMounted = false;
            if (emitter !== undefined) {
                // @ts-ignore: Unsure about the type import from web3
                emitter.options.requestManager.removeSubscription(connectedId);
            }
        };
        // eslint-disable-next-line
    }, [fromFilter, toFilter, emitterFromBlock, dai.events]);
};

export default useDaiEventListener;
