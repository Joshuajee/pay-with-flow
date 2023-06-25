import { resolveTransaction } from "@/libs/utils";

const mintTEUR = async (callback?: () => void, errCallback?: () => void) => {
    const cadence = `
        import FungibleToken from 0xFT
        import TEUR from 0xFlowMerchant
        
        transaction(){
            prepare(signer: AuthAccount) {

                let vault = signer.borrow<&TEUR.Vault>(from: /storage/teurVault)
                    
                // It's OK if the account already has a Vault, but we don't want to replace it
                if(vault != nil) {
                    vault?.deposit(from: <- TEUR.mintTokens())
                    return
                }
                
                // Create a new TEUR Vault and put it in storage
                signer.save(<-TEUR.mintTokens(), to: /storage/teurVault)
        
                // Create a public capability to the Vault that only exposes
                // the deposit function through the Receiver interface
                signer.link<&TEUR.Vault{FungibleToken.Receiver}>(
                    /public/teurReceiver,
                    target: /storage/teurVault
                )
        
                // Create a public capability to the Vault that only exposes
                // the balance field through the Balance interface
                signer.link<&TEUR.Vault{FungibleToken.Balance}>(
                    /public/teurBalance,
                    target: /storage/teurVault
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

export default mintTEUR