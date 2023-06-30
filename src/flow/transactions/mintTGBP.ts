import { resolveTransaction } from "@/libs/utils";

const mintTGBP = async (callback?: () => void, errCallback?: () => void) => {
    const cadence = `
        import FungibleToken from 0xFT
        import TGBP from 0xFlowMerchant
        
        transaction() {
            
            prepare(signer: AuthAccount) {

                let vault = signer.borrow<&TGBP.Vault>(from: /storage/tgbpVault)
                    
                // It's OK if the account already has a Vault, but we don't want to replace it
                if(vault != nil) {
                    vault?.deposit(from: <- TGBP.mintTokens())
                    return
                }
                
                // Create a new TGBP Vault and put it in storage
                signer.save(<-TGBP.mintTokens(), to: /storage/tgbpVault)
        
                // Create a public capability to the Vault that only exposes
                // the deposit function through the Receiver interface
                signer.link<&TGBP.Vault{FungibleToken.Receiver}>(
                    /public/tgbpReceiver,
                    target: /storage/tgbpVault
                )
        
                // Create a public capability to the Vault that only exposes
                // the balance field through the Balance interface
                signer.link<&TGBP.Vault{FungibleToken.Balance}>(
                    /public/tgbpBalance,
                    target: /storage/tgbpVault
                )
                
            }
            
            execute {
                log("Minted successfully")
            }

        }

    `;

    const args = (arg: any, t: any) => [];

    await resolveTransaction(cadence, args, callback, errCallback)

}

export default mintTGBP