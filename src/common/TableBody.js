import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  getKey(item, column) {
    return item._id + (column.key || column.path);
  }
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(dataItem => (
          <tr key={dataItem._id}>
            {columns.map(column => (
              <td key={this.getKey(dataItem, column)}>
                {this.renderCell(dataItem, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
