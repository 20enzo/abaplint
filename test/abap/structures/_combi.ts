import {expect} from "chai";
import {opt, sta, star, seq, alt, sub, beginEnd} from "../../../src/abap/structures/_combi";
import * as Statements from "../../../src/abap/statements";
import * as Structures from "../../../src/abap/structures";
import {StructureNode} from "../../../src/abap/node";
import {Structure} from "../../../src/abap/structures/_structure";

describe("structure combi statement", function() {
  let sta1 = sta(Statements.Move);

  it("sta1 match", function() {
    const parent = new StructureNode();
    const match = sta1.run([new Statements.Move()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
    expect(parent.getChildren()[0]).to.be.instanceof(Statements.Move);
  });

  it("sta1 not match", function() {
    const parent = new StructureNode();
    const match = sta1.run([new Statements.Do()], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(true);
  });

  it("sta1 multi", function() {
    const parent = new StructureNode();
    const match = sta1.run([new Statements.Move(), new Statements.Move()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("sta1 none", function() {
    const parent = new StructureNode();
    const match = sta1.run([], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(true);
  });
});

describe("structure combi opt", function() {
  const opt1 = opt(sta(Statements.Move));

  it("opt1 match", function() {
    const parent = new StructureNode();
    const match = opt1.run([new Statements.Move()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("opt1 not match", function() {
    const parent = new StructureNode();
    const match = opt1.run([new Statements.Do()], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(0);
  });

  it("opt1 multi", function() {
    const parent = new StructureNode();
    const match = opt1.run([new Statements.Move(), new Statements.Move()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("opt1 none", function() {
    const parent = new StructureNode();
    const match = opt1.run([], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(0);
  });
});

describe("structure combi star", function() {
  const star1 = star(sta(Statements.Move));

  it("star1 match", function() {
    const parent = new StructureNode();
    const match = star1.run([new Statements.Move()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("star1 not match", function() {
    const parent = new StructureNode();
    const match = star1.run([new Statements.Do()], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(0);
  });

  it("star1 multi1", function() {
    const parent = new StructureNode();
    const match = star1.run([new Statements.Move(), new Statements.Move()], parent);
    expect(match.matched.length).to.equal(2);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(2);
  });

  it("star1 multi2", function() {
    const parent = new StructureNode();
    const match = star1.run([new Statements.Move(), new Statements.Move(), new Statements.Do()], parent);
    expect(match.matched.length).to.equal(2);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(2);
  });

  it("star1 none", function() {
    const parent = new StructureNode();
    const match = star1.run([], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(0);
  });
});

describe("structure combi seq", function() {
  const seq1 = seq(sta(Statements.Move), sta(Statements.Do));

  it("seq1 match", function() {
    const parent = new StructureNode();
    const match = seq1.run([new Statements.Move(), new Statements.Do()], parent);
    expect(match.matched.length).to.equal(2);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(2);
  });

  it("seq1 not match", function() {
    const parent = new StructureNode();
    const match = seq1.run([new Statements.Do()], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(true);
    expect(parent.getChildren().length).to.equal(0);
  });

  it("seq1 multi2", function() {
    const parent = new StructureNode();
    const match = seq1.run([new Statements.Move(), new Statements.Do(), new Statements.Do()], parent);
    expect(match.matched.length).to.equal(2);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(2);
  });

  it("seq1 none", function() {
    const parent = new StructureNode();
    const match = seq1.run([], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(true);
    expect(parent.getChildren().length).to.equal(0);
  });
});

describe("structure combi alt", function() {
  const alt1 = alt(sta(Statements.Move), sta(Statements.Do));

  it("alt1 match1", function() {
    const parent = new StructureNode();
    const match = alt1.run([new Statements.Move()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("alt1 match2", function() {
    const parent = new StructureNode();
    const match = alt1.run([new Statements.Do()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("alt1 not match", function() {
    const parent = new StructureNode();
    const match = alt1.run([new Statements.Call()], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(true);
    expect(parent.getChildren().length).to.equal(0);
  });

  it("alt1 multi2", function() {
    const parent = new StructureNode();
    const match = alt1.run([new Statements.Move(), new Statements.Do()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("alt1 none", function() {
    const parent = new StructureNode();
    const match = alt1.run([], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(true);
    expect(parent.getChildren().length).to.equal(0);
  });
});

describe("structure combi sub structure", function() {
  const sub1 = sub(new Structures.Normal());

  it("sub1 match", function() {
    const parent = new StructureNode();
    const match = sub1.run([new Statements.Move()], parent);
    expect(match.matched.length).to.equal(1);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(1);
  });

  it("sub1 no match", function() {
    const parent = new StructureNode();
    const match = sub1.run([new Statements.ClassDefinition()], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(true);
    expect(parent.getChildren().length).to.equal(0);
  });
});

describe("structure combi beginEnd", function() {
  const sub1 = beginEnd(sta(Statements.Do), sta(Statements.EndDo), sta(Statements.EndDo));

  it("beginEnd, match", function() {
    const parent = new StructureNode();
    const match = sub1.run([new Statements.Do(), new Statements.EndDo(), new Statements.EndDo()], parent);
    expect(match.matched.length).to.equal(3);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
  });

  it("beginEnd, no match", function() {
    const parent = new StructureNode();
    const match = sub1.run([new Statements.ClassDefinition()], parent);
    expect(match.matched.length).to.equal(0);
    expect(match.unmatched.length).to.equal(1);
    expect(match.error).to.equal(true);
  });
});

describe("structure combi, complex1", function() {
  class Normal extends Structure {
    public getMatcher() {
      return alt(sta(Statements.Move), sta(Statements.Do));
    }
  }
  const sub1 = star(sub(new Normal()));

  it("complex1 match", function() {
    const parent = new StructureNode();
    const match = sub1.run([new Statements.Move(), new Statements.Move()], parent);
    expect(match.matched.length).to.equal(2);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(2);
// todo
//    expect(parent.getChildren()[0].getChildren().length).to.equal(1);
//    expect(parent.getChildren()[1].getChildren().length).to.equal(1);
  });

});

describe("structure combi, complex2", function() {
  const sub1 = star(alt(sta(Statements.Move), sta(Statements.Do)));

  it("complex2 match", function() {
    const parent = new StructureNode();
    const match = sub1.run([new Statements.Move(), new Statements.Move()], parent);
    expect(match.matched.length).to.equal(2);
    expect(match.unmatched.length).to.equal(0);
    expect(match.error).to.equal(false);
    expect(parent.getChildren().length).to.equal(2);
    expect(parent.getChildren()[0].getChildren().length).to.equal(0);
    expect(parent.getChildren()[1].getChildren().length).to.equal(0);
  });

});