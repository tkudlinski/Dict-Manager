// @flow

import RowItem from "./RowItem";

import type { PropsType } from "./RowItem";

export default class RowItemToAdd extends RowItem {
  static getDerivedStateFromProps() {
    return {
      editable: true
    };
  }
  constructor(props: PropsType) {
    super(props);
    this.state = {
      editable: true,
      newDomain: null,
      newRange: null
    };
  }
}
