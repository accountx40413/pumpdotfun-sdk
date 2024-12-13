"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalAccount = void 0;
const borsh_1 = require("@coral-xyz/borsh");
class GlobalAccount {
    discriminator;
    initialized = false;
    authority;
    feeRecipient;
    initialVirtualTokenReserves;
    initialVirtualSolReserves;
    initialRealTokenReserves;
    tokenTotalSupply;
    feeBasisPoints;
    constructor(discriminator, initialized, authority, feeRecipient, initialVirtualTokenReserves, initialVirtualSolReserves, initialRealTokenReserves, tokenTotalSupply, feeBasisPoints) {
        this.discriminator = discriminator;
        this.initialized = initialized;
        this.authority = authority;
        this.feeRecipient = feeRecipient;
        this.initialVirtualTokenReserves = initialVirtualTokenReserves;
        this.initialVirtualSolReserves = initialVirtualSolReserves;
        this.initialRealTokenReserves = initialRealTokenReserves;
        this.tokenTotalSupply = tokenTotalSupply;
        this.feeBasisPoints = feeBasisPoints;
    }
    getInitialBuyPrice(amount) {
        console.log('goes to get initial buy price');
        if (amount <= 0n) {
            return 0n;
        }
        let n = this.initialVirtualSolReserves * this.initialVirtualTokenReserves;
        console.log('get n');
        let i = this.initialVirtualSolReserves + amount;
        console.log('got i');
        let r = n / i + 1n;
        console.log('got r');
        let s = this.initialVirtualTokenReserves - r;
        console.log('got s');
        return s < this.initialRealTokenReserves
            ? s
            : this.initialRealTokenReserves;
    }
    static fromBuffer(buffer) {
        const structure = (0, borsh_1.struct)([
            (0, borsh_1.u64)("discriminator"),
            (0, borsh_1.bool)("initialized"),
            (0, borsh_1.publicKey)("authority"),
            (0, borsh_1.publicKey)("feeRecipient"),
            (0, borsh_1.u64)("initialVirtualTokenReserves"),
            (0, borsh_1.u64)("initialVirtualSolReserves"),
            (0, borsh_1.u64)("initialRealTokenReserves"),
            (0, borsh_1.u64)("tokenTotalSupply"),
            (0, borsh_1.u64)("feeBasisPoints"),
        ]);
        let value = structure.decode(buffer);
        return new GlobalAccount(BigInt(value.discriminator), value.initialized, value.authority, value.feeRecipient, BigInt(value.initialVirtualTokenReserves), BigInt(value.initialVirtualSolReserves), BigInt(value.initialRealTokenReserves), BigInt(value.tokenTotalSupply), BigInt(value.feeBasisPoints));
    }
}
exports.GlobalAccount = GlobalAccount;
//# sourceMappingURL=globalAccount.js.map