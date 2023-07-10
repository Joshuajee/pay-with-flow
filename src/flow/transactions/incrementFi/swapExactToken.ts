import { INCREMENT_ID } from "@/libs/enums";
import { contract, getReceiver, getVault, resolveTransaction } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

export interface ISwapDetails {
    amountInMax: number, 
    exactAmountOut: number, 
    path: INCREMENT_ID[],  
    to: string,  
    deadline: number,
    tx_ref: string 
}

const swapExactToken = async (detail: ISwapDetails, callback?: () => void, errCallback?: ()=> void) => {

    const { amountInMax, exactAmountOut, path,  to,  deadline, tx_ref } = detail

    const vault = getVault(path[0])

    const receiver = getReceiver(path[1])

    console.log(vault, receiver)

    console.log(path)

    let pay = null

    switch (path[1]) {
        case INCREMENT_ID.FLOW:
            pay = `outReceiverRef.depositFlowToken(from: <-vaultOut, tx_ref: "${tx_ref}")`
            break
        case INCREMENT_ID.TUSD:
            pay = `outReceiverRef.depositTUSD(from: <-vaultOut, tx_ref: "${tx_ref}")`
            break
        case INCREMENT_ID.TEUR:
            pay = `outReceiverRef.depositTEUR(from: <-vaultOut, tx_ref: "${tx_ref}")`
            break
        case INCREMENT_ID.TGBP:
            pay = `outReceiverRef.depositTGBP(from: <-vaultOut, tx_ref: "${tx_ref}")`
            break
    }

    const cadence = `
        import FlowMerchant from 0xFlowMerchant
        import FungibleToken from 0xFT
        import SwapRouter from 0xIncrementFi

        transaction() {

            prepare(userAccount: AuthAccount) {

                let tokenInVaultPath = ${vault}
                let tokenOutReceiverPath = ${receiver}
                
                let inVaultRef = userAccount.borrow<&FungibleToken.Vault>(from: tokenInVaultPath)
                    ?? panic("Could not borrow reference to the owner's in FT.Vault")
                /// Note: Receiver (to) should already have out FT.Vault initialized, otherwise tx reverts.
                let outReceiverRef = getAccount(${to}).getCapability(FlowMerchant.MerchantPublicPath)
                    .borrow<&{FlowMerchant.PublicProfileInterface}>()
                    ?? panic("Could not borrow Receiver reference to the Vault")
    
                let vaultInMax <- inVaultRef.withdraw(amount: ${amountInMax.toFixed(6)})
                let swapResVault <- SwapRouter.swapTokensForExactTokens(
                    vaultInMax: <-vaultInMax,
                    exactAmountOut: ${exactAmountOut.toFixed(6)},
                    tokenKeyPath: ["${path[0]}", "${path[1]}"],
                    deadline: ${deadline.toFixed(6)}
                )

                let vaultOut <- swapResVault.removeFirst()
                let vaultInLeft <- swapResVault.removeLast()
                destroy swapResVault
                
                ${pay}

                /// Deposit any remaining input FT back
                inVaultRef.deposit(from: <-vaultInLeft)
            }
        }

    `

    // const args = (arg: fcl.ArgFn, t: fcl.Types) => [
    //     arg(amountInMax.toFixed(6), t.UFix64), 
    //     arg(exactAmountOut.toFixed(6), t.UFix64), 
    //     arg(path, t.Array),
    //     arg(to, t.Address), 
    //     arg(deadline.toFixed(6), t.UFix64)
    // ]

    const args = (arg: fcl.ArgFn, t: fcl.Types) => []

    await resolveTransaction(cadence, args, callback, errCallback)

};

export default swapExactToken
 

