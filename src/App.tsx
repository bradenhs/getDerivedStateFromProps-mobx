import { autobind } from "core-decorators";
import { range } from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { Row } from "./Row";
import uuid from "uuid";
import faker from "faker";
import { MobxList } from "./MobxList";
import { SetStateList } from "./SetStateList";

interface State {
  rows: Row[];
}

@autobind
class App extends React.Component<{}, State> {
  state = {
    rows: range(100).map(this.createRow)
  };

  render() {
    return (
      <div>
        <button onClick={this.addRows}>Add 30 Rows</button>
        <button onClick={this.removeRows}>Remove 30 Rows</button>
        <hr />
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <h2>MobxList</h2>
            <MobxList rows={this.state.rows} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <h2>SetStateList</h2>
            <SetStateList rows={this.state.rows} />
          </div>
        </div>
      </div>
    );
  }

  addRows() {
    this.setState(state => ({
      rows: [...state.rows, ...range(30).map(this.createRow)]
    }));
  }

  removeRows() {
    this.setState(state => ({
      rows: state.rows.slice(30, -1)
    }));
  }

  createRow(): Row {
    return {
      id: uuid.v4(),
      content: faker.name.findName()
    };
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<App />, container);

if ((module as any).hot) {
  (module as any).hot.accept(() => document.location.reload());
}
