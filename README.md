# ゼロ知識証明 Mina のサンプルプロジェクト

## 概要
Minaブロックチェーンを利用したサンプルのプロジェクト  
ローカルで動作して、スマートコントラクトのデプロイと呼び出しをすることができる  
本プロジェクトは、別のプログラムからMina(o1js)の処理を呼び出す検証用のプロジェクトです。

## 環境
- npm 10.8.1 (v10以降)
- node v20.16.0 (v18以降)
- git 2.45.2.windows.1 (v2以降)
- zkAppCLI
    - 推奨されるベスト プラクティスを使用して、Mina Protocol用の zkApps (ゼロ ナレッジ アプリ) をスキャフォールディング、記述、テスト、およびデプロイできます。
    - ゼロ知識証明ベースのスマート コントラクトを記述するための TypeScript フレームワークであるo1jsを使用して記述されます。zkApp CLI を使用してプロジェクトを作成すると、o1js が自動的に含まれます。
- o1js

## 前準備
zkApp CLIをインストール  
```
npm install -g zkapp-cli
```
インストールされているか確認

```
zk --version
```

※PowerShellでzkコマンドを実行した場合、"UnauthorizedAccess"エラーが出たため、実行ポリシーはよしなに。  
もしくは、コマンドプロンプトで実行して下さい。

## 環境構築
1. パッケージをインストール
package.jsonがあるファイル内で以下を実行
```
npm install
```
2. ビルド
```
$ npm run build
```
3. 実行
```
# ファイルごとにテスト用の処理を記述している
# スマートコントラクトのステートを更新処理のみを呼び出す
$ node build/src/update.js 2

deployment succeeded :)
state after txn0: 2

# 検証処理のみを呼び出す
$ node build/src/verify.js 2

deployment succeeded :)
state after txn0: 2
verification succeeded ;)
```

## 開発の備忘録
### プロジェクトの作成
1. プロジェクト作成用のディレクトリに移動
2. プロジェクトを作成
```
$ zk project sample-zkapp

# UIプロジェクトのテンプレートを選択。今回は使わない。
? Create an accompanying UI project too? …
  next
  svelte
  nuxt
  empty
> none

√ Create an accompanying UI project too? · none
√ UI: Set up project
√ Initialize Git repo
√ Set up project
√ NPM install
√ NPM build contract
√ Set project name
√ Git init commit

Success!

Next steps:
  cd sample-zkapp
  git remote add origin <your-repo-url>
  git push -u origin main
```
3. 作成されたプロジェクトを確認
```
$ cd sample-zkapp
$ ls

.github
build
node_modules
src
.eslintrc.cjs
.gitattributes
.gitignore
.npmignore
.prettierignore
.prettierrc
babel.config.cjs
config.json
jest-resolver.cjs
jest.config.js
LICENSE
package-lock.json
package.json
README.md
tsconfig.json
```
4. テンプレートの初期ファイルを削除
```
$ rm src/Add.ts
$ rm src/Add.test.ts
$ rm src/interact.ts
```
5. 実装
スマートコントラクト用のファイルと実行用のファイルを作成する。  
以下を参照にしてください。  
- src/common.ts
  - デプロイ処理やスマートコントラクトの呼び出しなど、主要な処理を定義して共通化したファイル
- src/Game.ts
  - スマートコントラクトの定義ファイル
- src/index.ts
  - 外部からの呼び出しをするためのファイル(無くてもOK)
- src/update.ts
  - 外部ソースからの呼び出しを想定した、ステート更新のテスト用のファイル
- src/verify.ts
  - 外部ソースからの呼び出しを想定した、検証のテスト用のファイル

## 参考
Minaのチュートリアルを参考にいろいろいじってみました。  
https://docs.minaprotocol.com/zkapps/tutorials
