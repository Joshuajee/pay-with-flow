import { resolveTransaction } from "@/libs/utils";

const sendTGBP = async (recepient: string, tx_ref: string, amount: number, callback?: () => void, errCallback?: () => void) => {
    const cadence = `
        import FungibleToken from 0xFT
        import FlowMerchant from 0xFlowMerchant
        import TGBP from 0xFlowMerchant
        
        transaction(recepient: Address, tx_ref: String, amount: UFix64){

            prepare(signer: AuthAccount){

                let sender = signer.borrow<&TGBP.Vault>(from: /storage/tgbpVault)
                    ?? panic("Could not borrow Provider reference to the Vault")
        
                let receiverAccount = getAccount(recepient)

                let receiver = receiverAccount.getCapability(FlowMerchant.MerchantPublicPath)
                    .borrow<&{FlowMerchant.PublicProfileInterface}>()
                    ?? panic("Could not borrow Receiver reference to the Vault")
        
                let tempVault <- sender.withdraw(amount: amount)

                receiver.depositTGBP(from: <- tempVault, tx_ref: tx_ref)

            }

            execute {
                log("Sent successfully")
            }

        }

    `;

    const args = (arg: any, t: any) => [arg(recepient, t.Address), arg(tx_ref, t.String), arg(amount.toFixed(6), t.UFix64)];

    await resolveTransaction(cadence, args, callback, errCallback)

}

export default sendTGBP