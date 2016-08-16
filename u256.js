const BN = require('bn.js')
const ethUtils = require('ethereumjs-util')

module.exports = class U256 {
  constructor (value) {
    if ((typeof value === 'string') && ethUtils.isHexPrefixed(value)) {
      this._value = new BN(value, 16)
    } else {
      this._value = new BN(value, 10)
    }
  }

  toString (radix = 10) {
    if (radix === 16) {
      return '0x' + this._value.toString(16)
    }
    return this._value.toString(radix)
  }

  toBuffer () {
    return this._value.toBuffer('be', 32)
  }

  sub (u256) {
    return new U256(this._value.sub(u256._value))
  }

  add (u256) {
    return new U256(this._value.add(u256._value))
  }

  mul (u256) {
    return new U256(this._value.mul(u256._value))
  }

  div (u256) {
    return new U256(this._value.div(u256._value))
  }

  lt (u256) {
    return this._value.lt(u256._value)
  }

  gt (u256) {
    return this._value.gt(u256._value)
  }
}