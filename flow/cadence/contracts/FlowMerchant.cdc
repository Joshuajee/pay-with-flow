import TUSD from "./TestTokens/TUSD.cdc"
import TGBP from "./TestTokens/TGBP.cdc"
import TEUR from "./TestTokens/TEUR.cdc"

pub contract FlowMerchant {

    pub let MerchantStoragePath: StoragePath
    pub let MerchantPublicPath: PublicPath

    pub var merchantCount: UInt64

    pub resource interface PublicProfileInterface {
        pub var merchantName: String
        pub var merchantAddress: Address
        pub fun depositTUSD (vault: @TUSD.Vault)
    }

 
    pub resource Profile: PublicProfileInterface {

        pub let TUSDVault: @TUSD.Vault
        pub let TGBPVault: @TGBP.Vault
        pub let TEURVault: @TEUR.Vault

        pub var merchantName: String
        pub var merchantAddress: Address

        //Deposit Functions

        pub fun depositTUSD (vault: @TUSD.Vault) {
            self.TUSDVault.deposit(from: <- vault)
        }

        pub fun depositTGBP (vault: @TGBP.Vault) {
            self.TGBPVault.deposit(from: <- vault)
        }

        pub fun depositTEUR (vault: @TEUR.Vault) {
            self.TEURVault.deposit(from: <- vault)
        }

        init(merchantName: String, merchantAddress: Address) {
            self.merchantName = merchantName
            self.merchantAddress = merchantAddress
            self.TUSDVault <- TUSD.createEmptyVault()
            self.TGBPVault <- TGBP.createEmptyVault()
            self.TEURVault <- TEUR.createEmptyVault()
        }

        destroy() {
            destroy self.TUSDVault
            destroy self.TGBPVault
            destroy self.TEURVault
        }
    
    }

    pub fun createProfile(merchantName: String, merchantAddress: Address): @Profile {
        self.merchantCount = self.merchantCount + 1
        return <- create Profile(merchantName: merchantName, merchantAddress: merchantAddress)
    }

    init() {
        self.MerchantStoragePath = /storage/MerchantStoragePath
        self.MerchantPublicPath = /public/MerchantPublicPath
        self.merchantCount = 0
    }

}