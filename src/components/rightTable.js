import React, { Component } from 'react';

import { Table, TableBody, TableCell, TableHead} from '@material-ui/core';

const styles = {
  appbar: {
    alignItems: 'center',
  }
};

class RightTable extends Component{
  render() {
    return (
    <Table>
    <TableHead/>
    {this.props.items.map((item, index) => (
      <TableBody key={index}>{item}</TableBody>
    ))}
    </Table>

    )
    
    
    }
  }

export default (RightTable);
