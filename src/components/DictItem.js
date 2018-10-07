// @flow

import * as React from "react";

import { Alert, Button, Table } from "reactstrap";

import { ActionsConsumer } from "../utils/context";
import RowItem from "./RowItem";
import RowItemToAdd from "./RowItemToAdd";
import type { DictionaryType, ErrorsType } from "../utils/types";
import {
  hasDuplicatedDomainsRanges,
  hasCycles,
  hasChain
} from "../utils/validation";

import "./style.css";

type PropsType = {
  dictId: string,
  dict: DictionaryType,
  updateDict: (dictId: string, dict: DictionaryType) => void
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

    const cycles = hasCycles(dict);
    if (cycles) {
      errors.cycles = [cycles];
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
    oldDomain: string | null,
    newDomain: string | null,
    newRange: string | null
  ) => {
    const { dict: oldDict, dictId, updateDict } = this.props;
    if (oldDomain === null) {
      if (newDomain === null) {
        return;
      }
      updateDict(dictId, {
        ...oldDict,
        [newDomain]: newRange
      });
      return;
    }

    if (newDomain !== null) {
      const dict = { ...oldDict };
      const value = newRange === null ? oldDict[oldDomain] : newRange;
      delete dict[oldDomain];
      dict[newDomain] = value;
      updateDict(dictId, dict);
    } else if (newRange !== null) {
      updateDict(dictId, {
        ...oldDict,
        [oldDomain]: newRange
      });
    }
  };
  render() {
    const { dictId, dict } = this.props;
    const sortedDomains = Object.keys(dict).sort();
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
          {sortedDomains.map((domain, index) => (
            <RowItem
              key={`DictItem-${domain}`}
              index={index}
              domain={domain}
              range={dict[domain]}
              errors={this._getErrors()}
              updateDomainAndRange={this._updateDomainAndRange}
              deleteDomain={this._deleteDomain}
            />
          ))}
          <RowItemToAdd
            key={`DictItem-${""}`}
            index={sortedDomains.length + 1}
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
          {this.props.dictId}
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
