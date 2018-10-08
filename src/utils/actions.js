// @flow

import * as React from "react";
import uuid from "uuid/v4";
import localStorage from "localStorage";

import { STORAGE_KEY } from "./config";

import type {
  DictionaryIdType,
  CorePropsType,
  CoreStateType,
  DictionaryType
} from "../utils/types";

export const getActions = (
  t: React.Component<CorePropsType, CoreStateType>
) => {
  return {
    createDict: () => {
      t.setState(
        prevState => ({
          ...prevState,
          dictionaries: {
            [uuid()]: {},
            ...prevState.dictionaries
          }
        }),
        () => localStorage.setItem(STORAGE_KEY, JSON.stringify(t.state))
      );
    },
    updateDict: (dictId: DictionaryIdType, dict: DictionaryType) => {
      t.setState(
        prevState => {
          const updatedDictionaries = {
            ...prevState.dictionaries
          };
          updatedDictionaries[dictId] = dict;
          return {
            ...prevState,
            dictionaries: updatedDictionaries
          };
        },
        () => localStorage.setItem(STORAGE_KEY, JSON.stringify(t.state))
      );
    },
    removeDict: (dictId: DictionaryIdType) => {
      t.setState(
        prevState => {
          const updatedDictionaries = {
            ...prevState.dictionaries
          };
          delete updatedDictionaries[dictId];
          return {
            ...prevState,
            dictionaries: updatedDictionaries
          };
        },
        () => localStorage.setItem(STORAGE_KEY, JSON.stringify(t.state))
      );
    }
  };
};
