// @flow

import type { DictionaryType } from "./types";

export const hasDuplicatedDomainsRanges = (
  dict: DictionaryType
): Array<string> | null => {
  const duplicationInDomain = [];
  const domains = Object.keys(dict);
  domains.forEach((domain: string, domainIndex: number) => {
    if (
      domains.some(
        (domain2: string, domain2Index: number) =>
          domainIndex !== domain2Index && dict[domain] === dict[domain2]
      )
    ) {
      duplicationInDomain.push(domain);
    }
  });
  return duplicationInDomain.length !== 0 ? duplicationInDomain : null;
};

const findCycle = (
  initialDomain: string,
  currentDomain: string,
  dict: DictionaryType,
  maxDeepth: number,
  currentDepth: number
) => {
  const currentRange = dict[currentDomain];
  if (currentRange === initialDomain) {
    return true;
  } else if (currentRange === undefined || currentDepth >= maxDeepth) {
    return false;
  } else {
    return findCycle(
      initialDomain,
      currentRange,
      dict,
      maxDeepth,
      currentDepth + 1
    );
  }
};

// is providing name of the first domain, which begins cycle
export const hasCycles = (dict: DictionaryType): string | void => {
  const domains = Object.keys(dict);
  return domains.find((domain: string, domainIndex: number) =>
    findCycle(domain, domain, dict, domains.length, 1)
  );
};

export const hasChain = (dict: DictionaryType): Array<string> | null => {
  const domains = Object.keys(dict);
  const ranges = Object.values(dict);
  const chainInDomain = [];
  domains.forEach(domain => {
    if (ranges.includes(domain)) {
      chainInDomain.push(domain);
    }
  });
  return chainInDomain.length !== 0 ? chainInDomain : null;
};
