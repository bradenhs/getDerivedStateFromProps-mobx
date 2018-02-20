import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { Row } from "./Row";
import { getTotalPages, getVisibleRows } from "./utils";

interface Props {
  rows: Row[];
}

interface State {
  currentPage: number;
}

@autobind
export class SetStateList extends React.Component<Props, State> {
  state = {
    currentPage: 0
  };

  maxRowsPerPage = 30;

  render() {
    const totalPages = getTotalPages(this.props.rows.length);

    return (
      <div>
        <div>
          Page <b>{this.state.currentPage + 1}</b> of {totalPages}
        </div>
        <button
          disabled={this.state.currentPage === 0}
          onClick={this.goToPreviousPage}
        >
          Previous Page
        </button>
        <button
          disabled={this.state.currentPage + 1 === totalPages}
          onClick={this.goToNextPage}
        >
          Next Page
        </button>
        <hr />
        {getVisibleRows(this.props.rows, this.state.currentPage).map(row => (
          <div key={row.id}>{row.content}</div>
        ))}
      </div>
    );
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    const newPageTotal = getTotalPages(nextProps.rows.length);

    if (newPageTotal - 1 < prevState.currentPage) {
      return {
        currentPage: newPageTotal - 1
      };
    } else {
      return null;
    }
  }

  goToNextPage() {
    this.setState(state => ({ currentPage: state.currentPage + 1 }));
  }

  goToPreviousPage() {
    this.setState(state => ({ currentPage: state.currentPage - 1 }));
  }
}
