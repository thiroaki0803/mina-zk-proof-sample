import { Field, SmartContract, state, State, method } from 'o1js';

// TODO: 検証はどこから呼び出されてもいいが、正当データのアップデートは特定のアカウントからしか行いたくない
export class Game extends SmartContract {
  @state(Field) correct = State<Field>();

  init() {
    super.init();
  }

  @method async verify(num: Field) {
    const currentState = this.correct.get();
    this.correct.requireEquals(currentState);
    num.assertEquals(currentState);
  }

  @method async update(correct: Field) {
    this.correct.set(correct);
  }
}
