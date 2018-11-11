import {Statement} from "./_statement";
import {str, seq, alt, optPrio, IRunnable} from "../combi";
import {SimpleName, NamespaceSimpleName} from "../expressions";

export class DataEnd extends Statement {

  public getMatcher(): IRunnable {
    let common = seq(str("COMMON PART"), optPrio(new SimpleName()));

    let structure = seq(str("END OF"),
                        alt(common, new NamespaceSimpleName()));

    return seq(str("DATA"), structure);
  }

}