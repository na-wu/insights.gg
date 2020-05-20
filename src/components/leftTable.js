import React, { Component } from 'react';

import { Table, TableBody, TableCell, TableHead, TableContainer} from '@material-ui/core';

const styles = {
  appbar: {
    alignItems: 'center',
  }
};

class LeftTable extends Component{
  render() {
    return (
      <TableContainer>
        <Table>
          <TableHead/>
          {this.props.items.map((item, index) => (
          <TableBody key={index}>{item}</TableBody>
          ))}
          </Table>
          </TableContainer>
          )
        }
      }

export default (LeftTable);
