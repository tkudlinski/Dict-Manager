import { hasDuplicatedDomainsRanges, hasCycles, hasChain } from "./validation";

const dict = {
  Stonegrey1: "Dark Grey",
  Stonegrey2: "Dark Grey2",
  Caribbean: "Sea Turqoise"
};

it("finds duplicate Domains/Ranges", () => {
  const dict2 = {
    Stonegrey1: "Dark Grey",
    Stonegrey2: "Dark Grey",
    Caribbean: "Sea Turqoise"
  };
  expect(hasDuplicatedDomainsRanges(dict)).toEqual(null);
  const result2 = hasDuplicatedDomainsRanges(dict2);
  expect(result2).toEqual(expect.arrayContaining(["Stonegrey1", "Stonegrey2"]));
  expect(result2).toHaveLength(2);
});

it("finds cycles", () => {
  const dict3 = {
    Stonegrey: "DarkGrey",
    DarkGrey: "Stonegrey",
    Caribbean: "Sea Turqoise"
  };
  const dict4 = {
    SomeDmain: "CoolRange",
    Stonegrey: "Yellow",
    Yellow: "Red",
    Red: "DarkGrey",
    DarkGrey: "Stonegrey",
    Caribbean: "Sea Turqoise"
  };
  expect(hasCycles(dict)).toEqual(undefined);
  expect(hasCycles(dict3)).toEqual("Stonegrey");
  expect(hasCycles(dict4)).toEqual("Stonegrey");
});

it("finds chain", () => {
  const dict5 = {
    Stonegrey: "Yellow",
    Yellow: "Red",
    Red: "DarkGrey",
    DarkGrey: "Stonegrey",
    Caribbean: "Sea Turqoise"
  };
  expect(hasChain(dict)).toEqual(null);
  const result5 = hasChain(dict5);
  expect(result5).toEqual(
    expect.arrayContaining(["Stonegrey", "Yellow", "Red", "DarkGrey"])
  );
  expect(result5).toHaveLength(4);
});
