import React from "react";
import namor from "namor";
import axios from 'axios';
import "./index.css";

const charities = [
  {id: 183092, name: 'British Heart Foundation'},
  {id: 2116, name: 'Macmillan Cancer Support'},
  {id: 2357, name: 'Cancer Research UK'},
  {id: 13441, name: 'Oxfam'},
  {id: 183560, name: 'National Trust'},
  {id: 183092, name: 'Save the Children'}
];

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newCharity = () => {
  return {
    charity: namor.generate({ words: 1, numbers: 0 }),
    id: namor.generate({ words: 1, numbers: 0 }),
    donationAmount: 100
  };
};

function getDonationAmount (charity) {

  axios.get(`https://api.justgiving.com/2e449b72/v1/charity/`+charity.id+`/donations`, { headers : { Accept: 'application/json' } })      
  .then(function (response) {
      return {
        charity: charity.name,
        id: charity.id,
        donationAmount: response.data.donations[0].amount
      }
    });
}

export function makeData(len = 5) {
  return range(len).map(d => {
    return {
      ...newCharity(),
      children: range(10).map(newCharity)
    };
  });
}


export function makeDatas() {
  return charities.map(charity => {
    return {
      charity: charity.name,
      id: charity.id,
      donationAmount: 100
    };
  });
}



