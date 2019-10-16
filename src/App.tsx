import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import BorderWrapper from 'react-border-wrapper'
import DatePicker from 'react-datepicker';
import { Form, FormGroup, InputGroup, Input, Label, Button, Container, Col } from 'reactstrap';
import MyTable from './MyTable';
import { properties } from './properties.js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { isNumber } from 'util';

interface AppProps {
}

interface AppState {
  isLoading: boolean;
  selectedDate: Date;
}

export default class App extends React.Component<AppProps, AppState> {


  state = {
    isLoading: false, selectedDate: new Date(),
  };

  handleChange = (date) => {
    this.setState({ selectedDate: date }, () =>
      console.log('selectedDate-Updated:' + this.state.selectedDate)
    );
  }

  render() {

    const isLoading = this.state.isLoading
    const selectedDate = this.state.selectedDate

    const minLoan = properties.loan_min
    const maxLoan = properties.loan_max
    const minDur = properties.duration_min_month
    const maxDur = properties.duration_max_month
    const minDate = properties.date_min

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (

      <div>
        <Form onSubmit={this.handleSubmit}>
          <BorderWrapper borderWidth='1px' borderType='dotted'>
            <Container>
              <div className={'col-md-12 col-md-offset-3'}>
                <h2 className={'title'}>Annuity Parameters</h2>
                <FormGroup row>
                  <InputGroup>
                    <Col sm={{ size: 'auto', offset: 1 }}>
                      <Label for="loanAmount">Amount</Label>
                      <Input id="loanAmount" min={minLoan} max={maxLoan} name="loanAmount" type="number" />
                    </Col>
                    <Col sm={2}>
                      <Label for="nominalRate">Rate</Label>
                      <Input id="nominalRate" min="3" max="10" name="nominalRate" type="number" />
                    </Col>

                    <Col sm={2}>
                      <Label for="duration">Duration</Label>
                      <Input id="duration" name="duration" min={minDur} max={maxDur} type="number" />
                    </Col>

                    <Col sm={4}>
                      <Label for="startDate" sm={10}>Start Date</Label>

                      <DatePicker
                        name="startDate"
                        cellPadding="5px"
                        minDate={minDate}
                        dateFormat="yyyy-MM-dd"
                        selected={selectedDate}
                        onChange={this.handleChange} />

                    </Col>
                  </InputGroup>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 'auto', offset: 1 }}>
                    <Button>Send data</Button>
                  </Col>
                </FormGroup>
              </div>
            </Container>
          </BorderWrapper>

        </Form>

      </div>

    );

  }

  async handleSubmit(event) {
    event.preventDefault();
    const timestamp = event.target.startDate.value.concat("T00:00:00Z")
    const formData = new FormData(event.target);
    const object = {};

    formData.forEach((value, key) => {

      !isNumber(value) ? object[key] = Number(value) : object[key] = value
    }
    );
    object['startDate'] = timestamp;
    const json = JSON.stringify(object);
    if (properties.log_out)
      console.log('JSON Annuity Request:' + json);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    await axios.post('http://localhost:8090/generate-plan', json, config).then(res => {

      ReactDOM.render(
        <MyTable data={Array.from(res.data)} />,
        document.getElementById('result')
      );

    })
      .catch(e => {
        console.log('Error: ', e)
      });

  }

}

ReactDOM.render(<App />, document.getElementById('root'));





