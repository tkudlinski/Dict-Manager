import {
  hasDuplicatedDomainsRanges,
  hasForks,
  hasCycles,
  hasChain
} from "./validation";

const dict = {
  a: {
    domain: "Stonegrey1",
    range: "Dark Grey"
  },
  b: {
    domain: "Stonegrey2",
    range: "Dark Grey2"
  },
  c: {
    domain: "Caribbean",
    range: "Sea Turqoise"
  }
};

it("finds duplicate Domains/Ranges", () => {
  const dict2 = {
    a: {
      domain: "Stonegrey1",
      range: "Dark Grey"
    },
    b: {
      domain: "Stonegrey2",
      range: "Dark Grey"
    },
    c: {
      domain: "Caribbean",
      range: "Sea Turqoise"
    }
  };
  expect(hasDuplicatedDomainsRanges(dict)).toEqual(null);
  const result2 = hasDuplicatedDomainsRanges(dict2);
  expect(result2).toEqual(expect.arrayContaining(["a", "b"]));
  expect(result2).toHaveLength(2);
});

it("finds forks", () => {
  const dict25 = {
    a: {
      domain: "Stonegrey",
      range: "Dark Grey"
    },
    b: {
      domain: "Stonegrey",
      range: "Dark Grey555"
    },
    c: {
      domain: "Caribbean",
      range: "Sea Turqoise"
    }
  };
  expect(hasForks(dict)).toEqual(null);
  const result25 = hasForks(dict25);
  expect(result25).toEqual(expect.arrayContaining(["a", "b"]));
  expect(result25).toHaveLength(2);
});

it("finds cycles", () => {
  const dict3 = {
    a: {
      domain: "Stonegrey",
      range: "DarkGrey"
    },
    b: {
      domain: "DarkGrey",
      range: "Stonegrey"
    },
    c: {
      domain: "Caribbean",
      range: "Sea Turqoise"
    }
  };
  const dict4 = {
    a: {
      domain: "SomeDmain",
      range: "CoolRange"
    },
    b: {
      domain: "Stonegrey",
      range: "Yellow"
    },
    c: {
      domain: "Yellow",
      range: "Red"
    },
    d: {
      domain: "Red",
      range: "DarkGrey"
    },
    e: {
      domain: "DarkGrey",
      range: "Stonegrey"
    },
    f: {
      domain: "Caribbean",
      range: "Sea Turqoise"
    }
  };
  expect(hasCycles(dict)).toEqual(null);

  const result3 = hasCycles(dict3);
  expect(result3).toEqual(expect.arrayContaining(["a", "b"]));
  expect(result3).toHaveLength(2);

  const result4 = hasCycles(dict4);
  expect(result4).toEqual(expect.arrayContaining(["b", "c", "d", "e"]));
  expect(result4).toHaveLength(4);
});

it("finds chain", () => {
  const dict5 = {
    a: {
      domain: "Stonegrey",
      range: "Yellow"
    },
    b: {
      domain: "Yellow",
      range: "Red"
    },
    c: {
      domain: "Red",
      range: "DarkGrey"
    },
    d: {
      domain: "DarkGrey",
      range: "Stonegrey"
    },
    e: {
      domain: "Caribbean",
      range: "Sea Turqoise"
    }
  };
  expect(hasChain(dict)).toEqual(null);
  const result5 = hasChain(dict5);
  expect(result5).toEqual(expect.arrayContaining(["a", "b", "c", "d"]));
  expect(result5).toHaveLength(4);
});
