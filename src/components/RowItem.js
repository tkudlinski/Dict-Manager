// @flow

import * as React from "react";

import { Button, Input, Badge } from "reactstrap";

import type { DomainIdType, ErrorsType } from "../utils/types";

import "./style.css";

export type PropsType = {
  domainId: DomainIdType,
  domain: string | null,
  range: string | null,
  index: number,
  errors: ErrorsType,
  deleteDomain: null | ((domainId: DomainIdType) => void),
  updateDomainAndRange: (
    domainId: DomainIdType,
    newDomain: string | null,
    newRange: string | null
  ) => void
};
type StateType = {
  editable: boolean,
  newDomain: string | null,
  newRange: string | null
};

export default class RowItem extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      editable: false,
      newDomain: null,
      newRange: null
    };
  }
  _delete = () =>
    this.props.domain &&
    this.props.deleteDomain &&
    this.props.deleteDomain(this.props.domainId);
  _getErrors = () => {
    const { errors, domainId } = this.props;
    if (errors === null) {
      return null;
    }

    const jsxErrors = [];

    if (errors.cycles && errors.cycles.includes(domainId)) {
      jsxErrors.push(
        <Badge
          key={`Cycle-${domainId}`}
          className="rowItem_badge"
          color="danger"
        >
          Cycle
        </Badge>
      );
    }
    if (errors.duplication && errors.duplication.includes(domainId)) {
      jsxErrors.push(
        <Badge
          key={`Duplication-${domainId}`}
          className="rowItem_badge"
          color="warning"
        >
          Duplication
        </Badge>
      );
    }
    if (errors.chains && errors.chains.includes(domainId)) {
      jsxErrors.push(
        <Badge
          key={`Chain-${domainId}`}
          className="rowItem_badge"
          color="warning"
        >
          Chain
        </Badge>
      );
    }
    if (errors.forks && errors.forks.includes(domainId)) {
      jsxErrors.push(
        <Badge
          key={`Fork-${domainId}`}
          className="rowItem_badge"
          color="warning"
        >
          Fork
        </Badge>
      );
    }

    return jsxErrors;
  };
  _toggleEditable = () => {
    const { newDomain, newRange } = this.state;
    const { domainId, updateDomainAndRange } = this.props;
    updateDomainAndRange(domainId, newDomain, newRange);
    this.setState(prevState => ({
      editable: !prevState.editable,
      newDomain: null,
      newRange: null
    }));
  };
  _handleDomainChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({
      newDomain: event.target.value
    });
  };
  _handleRangeChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({
      newRange: event.target.value
    });
  };
  render() {
    const { domain, range, deleteDomain } = this.props;
    const { editable, newDomain, newRange } = this.state;

    const domainField = editable ? (
      <Input
        type="text"
        className="rowItem_input"
        value={newDomain || domain || ""}
        onChange={this._handleDomainChange}
      />
    ) : (
      domain
    );
    const rangeField = editable ? (
      <Input
        type="text"
        className="rowItem_input"
        value={newRange || range || ""}
        onChange={this._handleRangeChange}
      />
    ) : (
      range
    );
    return (
      <tr>
        <td>{domainField}</td>
        <td>{rangeField}</td>
        <td className="rowItem_errors">{this._getErrors()}</td>
        <td>
          <Button
            className="rowItem_btn"
            color={editable ? "primary" : "secondary"}
            onClick={this._toggleEditable}
          >
            {editable ? "Save" : "Edit"}
          </Button>
          {deleteDomain ? (
            <Button
              className="rowItem_btn"
              color="danger"
              onClick={this._delete}
            >
              Delete
            </Button>
          ) : null}
        </td>
      </tr>
    );
  }
}
