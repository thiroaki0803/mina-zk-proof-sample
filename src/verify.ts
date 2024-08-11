// pythonで呼ぶために実行用の関数としてまとめている。
// 固定値を正当データとして、検証のみを行うテスト用のファイル
// ローカルでのテストを想定しているため、デプロイ用の関数もコールしている
import { deploy, update, verify } from './common.js';

const [arg1] = process.argv.slice(2);
// 固定で 2 を正当データとする
const correct = 2
if (!Number(arg1)) {
  console.log('Please enter a number for the argument >:(');
  console.log('input arg is:', arg1);
} else {
  await deploy();
  await update(correct);
  await verify(Number(arg1));
}