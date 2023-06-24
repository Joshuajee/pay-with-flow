import { resolveTransaction } from "@/libs/utils";
import { mutate, tx } from "@onflow/fcl";

const sendFlow = async (recepient: string, tx_ref: string, amount: number, callback?: () => void, errCallback?: () => void) => {
    const cadence = `
        import FungibleToken from 0xFT
        import FlowToken from 0xFLOW
        import FlowMerchant from 0xFlowMerchant
    
        transaction(recepient: Address, tx_ref: String, amount: UFix64){
            prepare(signer: AuthAccount){

                let sender = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                    ?? panic("Could not borrow Provider reference to the Vault")
        
                let receiverAccount = getAccount(recepient)

                let receiver = receiverAccount.getCapability(FlowMerchant.MerchantPublicPath)
                    .borrow<&{FlowMerchant.PublicProfileInterface}>()
                    ?? panic("Could not borrow Receiver reference to the Vault")
        
                let tempVault <- sender.withdraw(amount: amount)

                receiver.depositFlowToken(from: <- tempVault, tx_ref: tx_ref)

            }
        }
    `;

    const args = (arg: any, t: any) => [arg(recepient, t.Address), arg(tx_ref, t.String), arg(amount.toFixed(4), t.UFix64)];

    await resolveTransaction(cadence, args, callback, errCallback)

}

export default sendFlow