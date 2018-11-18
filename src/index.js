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
    let currentComponent = this;  
    this.state.data.map(function(charity){
      axios.get(`https://api.justgiving.com/2e449b72/v1/charity/`+charity.id+`/donations`, { headers : { Accept: 'application/json' } })      
      .then(res => {
        const charityDonation = () => {
          return {
            charity: charity.name,
            id: charity.id,
            donationAmount: res.data.donations[0].amount
          };
        };
        console.log(charityDonation)
        currentComponent.setState({ charityDonation });
      });
    });
  }
  render() {
    const { charityDonation } = this.state;
    return (
      <div>
        <ReactTable
          charityDonation={charityDonation}
          columns={[
                {
                  Header: "Charity",
                  accessor: "charity"
                },
                {
                  Header: "id",
                  accessor: "id"
                },
                {
                 Header: "Donation Amount",
                 id: "donationAmount",
                 accessor: d => d.donationAmount
                }
          ]}
        />
        <br />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
