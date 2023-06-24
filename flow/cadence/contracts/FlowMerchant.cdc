import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79
import TUSD from "./TestTokens/TUSD.cdc"
import TGBP from "./TestTokens/TGBP.cdc"
import TEUR from "./TestTokens/TEUR.cdc"

pub contract FlowMerchant {

    pub enum TokenReceived: UInt8 {
        pub case FlowToken
        pub case TUSD
        pub case TEUR
        pub case TGBP
    }

    pub event Deposit(tx_ref: String, tokenReceived: UInt8, amount: UFix64)

    pub let MerchantStoragePath: StoragePath
    pub let MerchantPublicPath: PublicPath

    pub var merchantCount: UInt64

    pub resource interface PublicProfileInterface {
        pub var merchantName: String
        pub var merchantAddress: Address
     
        pub fun depositFlowToken (from: @FungibleToken.Vault, tx_ref: String)
        pub fun depositTUSD (from: @TUSD.Vault) 
        pub fun depositTGBP (from: @TGBP.Vault)
        pub fun depositTEUR (from: @TEUR.Vault)
    }

 
    pub resource Profile: PublicProfileInterface {

        pub let FlowTokenVault: @FungibleToken.Vault
        pub let TUSDVault: @TUSD.Vault
        pub let TGBPVault: @TGBP.Vault
        pub let TEURVault: @TEUR.Vault

        pub var merchantName: String
        pub var merchantAddress: Address

        //Deposit Functions

        pub fun depositFlowToken (from: @FungibleToken.Vault, tx_ref: String) {
            let balance: UFix64 = from.balance
            self.FlowTokenVault.deposit(from: <- from)
            emit Deposit(tx_ref: tx_ref, tokenReceived: TokenReceived.FlowToken.rawValue, amount: balance)
        }

        pub fun depositTUSD (from: @TUSD.Vault) {
            self.TUSDVault.deposit(from: <- from)
        }

        pub fun depositTGBP (from: @TGBP.Vault) {
            self.TGBPVault.deposit(from: <- from)
        }

        pub fun depositTEUR (from: @TEUR.Vault) {
            self.TEURVault.deposit(from: <- from)
        }

        init(merchantName: String, merchantAddress: Address) {
            self.merchantName = merchantName
            self.merchantAddress = merchantAddress

            self.FlowTokenVault <- FlowToken.createEmptyVault()
            self.TUSDVault <- TUSD.createEmptyVault()
            self.TGBPVault <- TGBP.createEmptyVault()
            self.TEURVault <- TEUR.createEmptyVault()
        }

        destroy() {
            destroy self.FlowTokenVault
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