// pythonで呼ぶために実行用の関数としてまとめている。
// スマートコントラクトに保持しているStateの更新のみを行うテスト用のファイル
// ローカルでのテストを想定しているため、デプロイ用の関数もコールしている

import { deploy, update } from './common.js';

const [arg1] = process.argv.slice(2);
if (!Number(arg1)) {
  console.log('Please enter a number for the argument >:(');
  console.log('input arg is:', arg1);
} else {
  await deploy();
  await update(Number(arg1));
}