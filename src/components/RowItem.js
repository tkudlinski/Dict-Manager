// @flow

import * as React from "react";

import { Button, Input, Badge } from "reactstrap";

import type { ErrorsType } from "../utils/types";

import "./style.css";

export type PropsType = {
  domain: string | null,
  range: string | null,
  index: number,
  errors: ErrorsType,
  deleteDomain: null | ((domain: string) => void),
  updateDomainAndRange: (
    oldDomain: string | null,
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
    this.props.deleteDomain(this.props.domain);
  _getErrors = () => {
    const { errors, domain } = this.props;
    if (errors === null || domain === null) {
      return null;
    }

    const jsxErrors = [];

    if (errors.cycles && errors.cycles.includes(domain)) {
      jsxErrors.push(
        <Badge key={`Cycle-${domain}`} className="rowItem_badge" color="danger">
          Cycle
        </Badge>
      );
    }
    if (errors.duplication && errors.duplication.includes(domain)) {
      jsxErrors.push(
        <Badge
          key={`Duplication-${domain}`}
          className="rowItem_badge"
          color="warning"
        >
          Duplication
        </Badge>
      );
    }
    if (errors.chains && errors.chains.includes(domain)) {
      jsxErrors.push(
        <Badge
          key={`Chain-${domain}`}
          className="rowItem_badge"
          color="warning"
        >
          Chain
        </Badge>
      );
    }

    return jsxErrors;
  };
  _toggleEditable = () => {
    const { newDomain, newRange } = this.state;
    const { domain, updateDomainAndRange } = this.props;
    updateDomainAndRange(domain, newDomain, newRange);
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
