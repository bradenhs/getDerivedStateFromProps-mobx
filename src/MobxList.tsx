import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { Row } from "./Row";
import { getTotalPages, getVisibleRows } from "./utils";

interface Props {
  rows: Row[];
}

@observer
@autobind
export class MobxList extends React.Component<Props> {
  @observable currentPage = 0;

  render() {
    const totalPages = getTotalPages(this.props.rows.length);

    return (
      <div>
        <div>
          Page <b>{this.currentPage + 1}</b> of {totalPages}
        </div>
        <button
          disabled={this.currentPage === 0}
          onClick={this.goToPreviousPage}
        >
          Previous Page
        </button>
        <button
          disabled={this.currentPage + 1 === totalPages}
          onClick={this.goToNextPage}
        >
          Next Page
        </button>
        <hr />
        {getVisibleRows(this.props.rows, this.currentPage).map(row => (
          <div key={row.id}>{row.content}</div>
        ))}
      </div>
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    const newPageTotal = getTotalPages(nextProps.rows.length);

    if (newPageTotal - 1 < this.currentPage) {
      this.currentPage = newPageTotal - 1;
    }
  }

  goToNextPage() {
    this.currentPage++;
  }

  goToPreviousPage() {
    this.currentPage--;
  }
}
