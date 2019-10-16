import * as React from 'react';
import BorderWrapper from 'react-border-wrapper'
import { Table } from 'reactstrap';
import { Container } from 'reactstrap';

export default class MyTable extends React.Component<any, any> {

   render() {

      const data = this.props.data;
      const contents = data.map(item => {
         return <React.Fragment key={item.date}>
            <tr>
               <td className="w-15">{item.date.substring(0, 10)}</td>
               <td>{item.borrowerPaymentAmount}</td>
               <td>{item.initialOutstandingPrincipal}</td>
               <td>{item.interest}</td>
               <td>{item.principal}</td>
               <td>{item.remainingOutstandingPrincipal}</td>
            </tr>
         </React.Fragment>
      });
      return (
         <React.Fragment>
            <BorderWrapper borderWidth="0.5px" borderType="groove">
               <h2 className={'title'}>Annuity Installments</h2>
               <Table striped bordered hover>
                  <tbody style={{ 'height': '300px', 'overflow': 'scroll', 'display': 'block' }}>
                     <tr>
                        <th>Payment Date</th>
                        <th>Payment Amount</th>
                        <th>Initial Principal</th>
                        <th>Interest</th>
                        <th>Principal</th>
                        <th>Remaining Principal</th>
                     </tr>
                     {contents}
                  </tbody>
               </Table>
            </BorderWrapper>
         </React.Fragment >
      );

   }
}


