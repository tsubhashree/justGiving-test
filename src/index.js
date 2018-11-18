import React from "react";
import { render } from "react-dom";
import axios from 'axios';
import { makeDatas } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeDatas(),
      charityDonation: []
    };
  }
  componentDidMount() {
    this.state.data.map((charity) => {
      axios.get(`https://api.justgiving.com/2e449b72/v1/charity/`+charity.id+`/donations`, { headers : { Accept: 'application/json' } })      
      .then((res) => {
        var newCharityDonation = {
            name: charity.name,
            id: charity.id,
            donationAmount: res.data.donations[0].amount
        };
        this.setState({ 
          charityDonation: this.state.charityDonation.concat([newCharityDonation])
        })
      });
    });
  }
  render() {
    console.log(this.state.charityDonation)
    const { charityDonation } = this.state;
    return (
      <div>
        <ReactTable
          data={charityDonation}
          columns={[
                {
                  Header: "Charity",
                  accessor: "name"
                },
                {
                  Header: "id",
                  accessor: "id"
                },
                {
                 Header: "Donation Amount",
                 accessor: "donationAmount"
                }
          ]}
        />
        <br />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
