// @flow

import * as React from "react";
import { Alert } from "reactstrap";

import { StateConsumer, ActionsConsumer } from "../utils/context";
import DictItem from "../components/DictItem";

import "./style.css";

type PropsType = {};
type StateType = {};

export default class DictList extends React.Component<PropsType, StateType> {
  render() {
    return (
      <div className="dictList">
        <ActionsConsumer>
          {({ createDict, updateDict }) => {
            return (
              <React.Fragment>
                <Alert
                  className="dictItem"
                  onClick={() => createDict()}
                  color="info"
                >
                  [+] Dictionary
                </Alert>
                <StateConsumer>
                  {({ dictionaries }) => {
                    return Object.keys(dictionaries).map((dictId: string) => {
                      if (!dictionaries[dictId]) {
                        return null;
                      }
                      return (
                        <DictItem
                          updateDict={updateDict}
                          dict={dictionaries[dictId]}
                          key={`DictList-${dictId}`}
                          dictId={dictId}
                        />
                      );
                    });
                  }}
                </StateConsumer>
              </React.Fragment>
            );
          }}
        </ActionsConsumer>
      </div>
    );
  }
}
