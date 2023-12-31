import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import TUSD from "./TestTokens/TUSD.cdc"
import TGBP from "./TestTokens/TGBP.cdc"
import TEUR from "./TestTokens/TEUR.cdc"

pub contract FlowMerchant {

    pub enum SupportedToken: UInt8 {
        pub case FlowToken
        pub case TUSD
        pub case TEUR
        pub case TGBP
    }

    pub event Deposit(paymentId: UInt256, tx_ref: String, tokenReceived: UInt8, amount: UFix64)
    pub event Withdrawal(tokenWithdrawn: UInt8, amount: UFix64)

    pub let MerchantStoragePath: StoragePath
    pub let MerchantPublicPath: PublicPath

    pub var merchantCount: UInt256
    pub var paymentId: UInt256

    pub fun generatePaymentId (): UInt256 {
        FlowMerchant.paymentId = FlowMerchant.paymentId + 1
        return  FlowMerchant.paymentId
    }


    pub resource interface PublicProfileInterface {
        pub var merchantName: String
        pub fun depositFlowToken (from: @FungibleToken.Vault, tx_ref: String)
        pub fun depositTUSD (from: @FungibleToken.Vault, tx_ref: String) 
        pub fun depositTGBP (from: @FungibleToken.Vault, tx_ref: String)
        pub fun depositTEUR (from: @FungibleToken.Vault, tx_ref: String)
    }

    pub resource interface PrivateProfileInterface {
        pub fun withdrawFlowToken (amount: UFix64): @FungibleToken.Vault
        pub fun withdrawTUSD (amount: UFix64): @FungibleToken.Vault
        pub fun withdrawTGBP (amount: UFix64): @FungibleToken.Vault
        pub fun withdrawTEUR (amount: UFix64): @FungibleToken.Vault
    }

 
    pub resource Profile: PublicProfileInterface {

        pub let FlowTokenVault: @FungibleToken.Vault
        pub let TUSDVault: @TUSD.Vault
        pub let TGBPVault: @TGBP.Vault
        pub let TEURVault: @TEUR.Vault
        pub var merchantName: String


        //Withdraw Functions

        pub fun withdrawFlowToken (amount: UFix64): @FungibleToken.Vault {
            emit Withdrawal(tokenWithdrawn: SupportedToken.FlowToken.rawValue, amount: amount)
            return <- self.FlowTokenVault.withdraw(amount: amount)
        }

        pub fun withdrawTUSD (amount: UFix64):  @FungibleToken.Vault {
            emit Withdrawal(tokenWithdrawn: SupportedToken.TUSD.rawValue, amount: amount)
            return <- self.TUSDVault.withdraw(amount: amount)
        }

        pub fun withdrawTGBP (amount: UFix64):  @FungibleToken.Vault {
            emit Withdrawal(tokenWithdrawn: SupportedToken.TGBP.rawValue, amount: amount)
            return <- self.TGBPVault.withdraw(amount: amount)
        }

        pub fun withdrawTEUR (amount: UFix64):  @FungibleToken.Vault {
            emit Withdrawal(tokenWithdrawn: SupportedToken.TEUR.rawValue, amount: amount)
            return <- self.TEURVault.withdraw(amount: amount)
        }


        //Deposit Functions

        pub fun depositFlowToken (from: @FungibleToken.Vault, tx_ref: String) {
            let balance: UFix64 = from.balance
            self.FlowTokenVault.deposit(from: <- from)
            let paymentId = FlowMerchant.generatePaymentId() 
            emit Deposit(paymentId: paymentId, tx_ref: tx_ref, tokenReceived: SupportedToken.FlowToken.rawValue, amount: balance)
        }

        pub fun depositTUSD (from: @FungibleToken.Vault, tx_ref: String) {
            let balance: UFix64 = from.balance
            self.TUSDVault.deposit(from: <- from)
            let paymentId = FlowMerchant.generatePaymentId() 
            emit Deposit(paymentId: paymentId, tx_ref: tx_ref, tokenReceived: SupportedToken.TUSD.rawValue, amount: balance)
        }

        pub fun depositTGBP (from: @FungibleToken.Vault, tx_ref: String) {
            let balance: UFix64 = from.balance
            self.TGBPVault.deposit(from: <- from)
            let paymentId = FlowMerchant.generatePaymentId() 
            emit Deposit(paymentId: paymentId, tx_ref: tx_ref, tokenReceived: SupportedToken.TGBP.rawValue, amount: balance)
        }

        pub fun depositTEUR (from: @FungibleToken.Vault, tx_ref: String) {
            let balance: UFix64 = from.balance
            self.TEURVault.deposit(from: <- from)
            let paymentId = FlowMerchant.generatePaymentId() 
            emit Deposit(paymentId: paymentId, tx_ref: tx_ref, tokenReceived: SupportedToken.TEUR.rawValue, amount: balance)
        }


        init(merchantName: String) {
            self.merchantName = merchantName

            self.FlowTokenVault <- FlowToken.createEmptyVault()
            self.TUSDVault <- TUSD.createEmptyVault()
            self.TGBPVault <- TGBP.createEmptyVault()
            self.TEURVault <- TEUR.createEmptyVault()

            FlowMerchant.merchantCount = FlowMerchant.merchantCount + 1
            FlowMerchant.paymentId = FlowMerchant.paymentId + 1
        }

        destroy() {
            destroy self.FlowTokenVault
            destroy self.TUSDVault
            destroy self.TGBPVault
            destroy self.TEURVault
        }
    
    }

    pub fun createProfile(merchantName: String): @Profile {
        return <- create Profile(merchantName: merchantName)
    }

    init() {
        self.MerchantStoragePath = /storage/MerchantStoragePath
        self.MerchantPublicPath = /public/MerchantPublicPath
        self.merchantCount = 0
        self.paymentId = 0
    }

}