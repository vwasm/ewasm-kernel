'use strict'
const tape = require('tape')
const fs = require('fs')
const cp = require('child_process')

// This
const Environment = require('../environment.js')
const Interface = require('../interface.js')
// console.log('tes1  11')
// get the test names
let tests = fs.readdirSync(__dirname).filter((file) => file.endsWith('.wast'))
// tests = ['balance.wast']
// run the tests
for (let testName of tests) {
  testName = testName.split('.')[0]
  tape(testName, (t) => {
    // Compile Command
    cp.execSync(`${__dirname}/../../evm-wasm-transcompiler/deps/sexpr-wasm-prototype/out/sexpr-wasm  ${__dirname}/${testName}.wast -o ${__dirname}/${testName}.wasm`)
    const buffer = fs.readFileSync(`${__dirname}/${testName}.wasm`)
    const envData = fs.readFileSync(`${__dirname}/${testName}.json`)

    const environment = new Environment(envData)
    const ethInterface = new Interface(environment)

    try {
      const mod = Wasm.instantiateModule(buffer, {'ethereum': ethInterface})
      ethInterface.setModule(mod)
      // ethInterface.address(0)
      // console.log(ethInterface.environment);
      mod.exports.test()
    } catch (e) {
      console.error('FAIL')
      console.error(e)
    } finally {
      console.log('done')
    }
    t.end()
  })
}
