import React from "react";
import namor from "namor";
import axios from 'axios';
import "./index.css";

const charities = [
  {id: 183092, name: "British Heart Foundation"},
  {id: 2116, name: "Macmillan Cancer Support"},
  {id: 2357, name: "Cancer Research UK"},
  {id: 13441, name: "Oxfam"},
  {id: 183560, name: "National Trust"},
  {id: 183092, name: "Save the Children"}
];

export function makeDatas() {
  return charities.map(charity => {
    return {
      name: charity.name,
      id: charity.id
    };
  });
}



