//import FungibleToken from 0x0ae53cb6e3f42a79

pub contract FlowMerchant {

    pub let MerchantStoragePath: StoragePath

    pub var merchantCount: UInt64

    pub var merchants: &{Address: Profile}


    pub resource Profile {

        pub var merchantName: String
        pub var merchantAddress: Address

        // pub fun addVault(allowedAmount: UFix64): @Minter {
        //     return <-create Minter(allowedAmount: allowedAmount)
        // }

        init(merchantName: String, merchantAddress: Address) {
            self.merchantName = merchantName
            self.merchantAddress = merchantAddress
        }
        
    
    }

    init() {
        self.MerchantStoragePath = /storage/MerchantStoragePath
        self.merchantCount = 0
        self.merchants <- {}

    }

}