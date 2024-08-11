import { Game } from './Game.js';
import { Field, Mina, PrivateKey, AccountUpdate } from 'o1js';

const useProof = false;

const Local = await Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);

// TODO: 実際にデプロイ済みのアカウントを取得して実行する方法の調査が必要
const deployerAccount = Local.testAccounts[0];
const deployerKey = deployerAccount.key;
const senderAccount = Local.testAccounts[1];
const senderKey = senderAccount.key;

// Create a public/private key pair. The public key is your address and where you deploy the zkApp to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();
const zkAppInstance = new Game(zkAppAddress);

async function deploy(){ 
  // create an instance of Game - and deploy it to zkAppAddress
  try {
    const deployTxn = await Mina.transaction(deployerAccount, async () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      await zkAppInstance.deploy();
    });
    await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();
    console.log('deployment succeeded :)');
  } catch (error: any) {
    console.log('deployment failed :(');
  }
}

async function update(correct: number) {
  try {
    const txn0 = await Mina.transaction(senderAccount, async () => {
      await zkAppInstance.update(Field(correct));
    });
    await txn0.prove();
    await txn0.sign([senderKey]).send();
    const num = zkAppInstance.correct.get();
    console.log('state after txn0:', num.toString());
  } catch (error: any) {
    console.log(error.message);
  }
}

async function verify(num:number) {
  try {
      const txn1 = await Mina.transaction(senderAccount, async () => {
        await zkAppInstance.verify(Field(num));
      });
      await txn1.prove();
      await txn1.sign([senderKey]).send();
      console.log('verification succeeded ;)');
  } catch (error: any) {
      console.log(error.message);
  }
}

export { deploy, update, verify };