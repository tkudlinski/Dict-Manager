// @flow

import * as React from "react";
import uuid from "uuid/v4";
import localStorage from "localStorage";

import { STORAGE_KEY } from "./config";

import type {
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
    updateDict: (dictId: string, dict: DictionaryType) => {
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
    removeDict: (dictId: string) => {
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
