import { Statement } from "./statement";
import { Token } from "../tokens/";
import Reuse from "./reuse";
import * as Combi from "../combi";

let str = Combi.str;
let seq = Combi.seq;
let alt = Combi.alt;

// method call
export class Call extends Statement {

  public static get_matcher(): Combi.IRunnable {
    let call = seq(str("CALL METHOD"), Reuse.field(), Reuse.method_parameters());
    return alt(call, Reuse.method_call_chain());
  }

  public static match(tokens: Array<Token>): Statement {
    let result = Combi.Combi.run(this.get_matcher( ), tokens, true);
    if (result === true) {
      return new Call(tokens);
    }
    return undefined;
  }

}