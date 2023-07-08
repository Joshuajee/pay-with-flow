import { INCREMENT_ID } from "@/libs/enums";
import * as fcl from "@onflow/fcl";

const getPriceOutput = async (amount: number, from: INCREMENT_ID, to: INCREMENT_ID) => {
    const cadence = `
        import SwapRouter from  0xIncrementFi
    
        pub fun main(amountIn: UFix64, tokenKeyPath: [String]): [UFix64] {
            return SwapRouter.getAmountsOut(amountIn: amountIn, tokenKeyPath: tokenKeyPath)
        }

    `;

    const args = (arg: fcl.ArgFn, t: fcl.Types) => [
        arg(amount.toFixed(6), t.UFix64), 
        arg([from, to], t.Array(t.String)), 
    ]

    const results = await fcl.query({ cadence, args });

    return results
};

export default getPriceOutput





/// SwapRouter.cdc

