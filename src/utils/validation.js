// @flow

import type { DictionaryType, DomainIdType } from "./types";

export const hasDuplicatedDomainsRanges = (
  dict: DictionaryType
): Array<DomainIdType> | null => {
  const duplicationInDomain = [];
  const domainIds: Array<DomainIdType> = Object.keys(dict);
  domainIds.forEach((domainId: DomainIdType) => {
    if (
      domainIds.some(
        (domainId2: string) =>
          domainId !== domainId2 &&
          dict[domainId].range === dict[domainId2].range
      )
    ) {
      duplicationInDomain.push(domainId);
    }
  });
  return duplicationInDomain.length !== 0 ? duplicationInDomain : null;
};

export const hasForks = (dict: DictionaryType): Array<DomainIdType> | null => {
  const domainIds = Object.keys(dict);
  const forkInDomain = [];

  domainIds.forEach((domainId: DomainIdType) => {
    if (
      domainIds.some(
        (domainId2: DomainIdType) =>
          domainId !== domainId2 &&
          dict[domainId].domain === dict[domainId2].domain &&
          dict[domainId].range !== dict[domainId2].range
      )
    ) {
      forkInDomain.push(domainId);
    }
  });

  return forkInDomain.length !== 0 ? forkInDomain : null;
};

const findCycle = (
  initialDomainId: DomainIdType,
  currentDomainId: DomainIdType | void,
  dict: DictionaryType,
  maxDeepth: number,
  currentDepth: number
) => {
  const currentRange =
    currentDomainId && dict[currentDomainId] && dict[currentDomainId].range;
  if (currentRange === dict[initialDomainId].domain) {
    return true;
  } else if (currentRange === undefined || currentDepth >= maxDeepth) {
    return false;
  } else {
    return findCycle(
      initialDomainId,
      Object.keys(dict).find(
        (domainId: DomainIdType) =>
          currentDomainId !== domainId && dict[domainId].domain === currentRange
      ),
      dict,
      maxDeepth,
      currentDepth + 1
    );
  }
};

export const hasCycles = (dict: DictionaryType): Array<DomainIdType> | null => {
  const domainIds = Object.keys(dict);
  const cycleInDomain = [];
  domainIds.forEach((domainId: DomainIdType, domainIndex: number) => {
    if (findCycle(domainId, domainId, dict, domainIds.length, 1)) {
      cycleInDomain.push(domainId);
    }
  });
  return cycleInDomain.length !== 0 ? cycleInDomain : null;
};

export const hasChain = (dict: DictionaryType): Array<DomainIdType> | null => {
  const domainIds = Object.keys(dict);
  const ranges = domainIds.map(
    (domainId: DomainIdType) => dict[domainId].range
  );
  const chainInDomain = [];
  domainIds.forEach((domainId: DomainIdType) => {
    if (ranges.includes(dict[domainId].domain)) {
      chainInDomain.push(domainId);
    }
  });
  return chainInDomain.length !== 0 ? chainInDomain : null;
};
