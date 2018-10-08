// @flow

import * as React from "react";
import { Alert, Button, Table } from "reactstrap";
import uuid from "uuid/v4";

import { ActionsConsumer } from "../utils/context";
import RowItem from "./RowItem";
import RowItemToAdd from "./RowItemToAdd";
import type {
  DomainIdType,
  DictionaryType,
  DictionaryIdType,
  ErrorsType
} from "../utils/types";
import {
  hasDuplicatedDomainsRanges,
  hasForks,
  hasCycles,
  hasChain
} from "../utils/validation";

import "./style.css";

type PropsType = {
  dictId: DictionaryIdType,
  dict: DictionaryType,
  updateDict: (dictId: DictionaryIdType, dict: DictionaryType) => void
};
type StateType = { expanded: boolean };

export default class DictItem extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  _deleteDomain = (domain: string): void => {
    const { dictId, updateDict } = this.props;
    const dict = { ...this.props.dict };
    delete dict[domain];
    updateDict(dictId, dict);
  };
  _getErrors = (): ErrorsType => {
    const { dict } = this.props;
    const errors = {};

    const duplication = hasDuplicatedDomainsRanges(dict);
    if (duplication) {
      errors.duplication = duplication;
    }

    const forks = hasForks(dict);
    if (forks) {
      errors.forks = forks;
    }

    const cycles = hasCycles(dict);
    if (cycles) {
      errors.cycles = cycles;
    }

    const chains = hasChain(dict);
    if (chains) {
      errors.chains = chains;
    }

    if (Object.keys(errors).length === 0) {
      return null;
    }
    return errors;
  };
  _toogleDict = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };
  _updateDomainAndRange = (
    domainId: string,
    newDomain: string | null,
    newRange: string | null
  ) => {
    const { dict: oldDict, dictId, updateDict } = this.props;
    updateDict(dictId, {
      ...oldDict,
      [domainId]: {
        domain: newDomain === null ? oldDict[domainId].domain : newDomain,
        range: newRange === null ? oldDict[domainId].range : newRange
      }
    });
  };
  render() {
    const { dictId, dict } = this.props;
    const domainIds = Object.keys(dict);
    const items = this.state.expanded ? (
      <Table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Range</th>
            <th>Errors</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {domainIds.map((domainId: DomainIdType, index: number) => (
            <RowItem
              key={`DictItem-${domainId}`}
              index={index}
              domainId={domainId}
              domain={dict[domainId].domain}
              range={dict[domainId].range}
              errors={this._getErrors()}
              updateDomainAndRange={this._updateDomainAndRange}
              deleteDomain={this._deleteDomain}
            />
          ))}
          <RowItemToAdd
            key={`DictItem-${""}`}
            index={domainIds.length + 1}
            domainId={uuid()}
            domain={null}
            range={null}
            errors={null}
            updateDomainAndRange={this._updateDomainAndRange}
            deleteDomain={null}
          />
        </tbody>
      </Table>
    ) : null;
    return (
      <React.Fragment>
        <Alert className="dictItem" onClick={this._toogleDict} color="dark">
          {dictId}
          <ActionsConsumer>
            {({ removeDict }) => {
              return (
                <Button
                  className="dictItem_remove"
                  onClick={e => {
                    e.stopPropagation();
                    removeDict(dictId);
                  }}
                >
                  Remove
                </Button>
              );
            }}
          </ActionsConsumer>
        </Alert>
        {items}
      </React.Fragment>
    );
  }
}
