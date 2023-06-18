import FlowMerchant from 0x01
import RPSToken from 0x03


transaction {
    prepare(acct: AuthAccount) {

        // Create a new empty Games
        let profile <- FlowMerchant.createProfile(merchantName: "John", merchantAddress: acct.address )

        // store the empty Account in account storage
        acct.save<@FlowMerchant.Games>(<-games, to: FlowMerchant.MerchantStoragePath)

        log("Profile Created")

        // create a public capability for the Games
        let capability = acct.link<&{FlowMerchant.GamesCollectionInterface}>(FlowMerchant.GamesPublicPath, target: FlowMerchant.MerchantStoragePath)

        log("Capability created")

        // Create a new empty Vault object
		let vaultA <- RPSToken.createEmptyVault()
			
		// Store the vault in the account storage
		acct.save<@RPSToken.Vault>(<-vaultA, to: RPSToken.VaultStoragePath)

        log("Empty Vault stored")

        // Create a public Receiver capability to the Vault
		let ReceiverRef = acct.link<&RPSToken.Vault{RPSToken.Receiver, RPSToken.Balance}>(RPSToken.ReceiverPublicPath, target: RPSToken.VaultStoragePath)

        log("References created")
    }

}