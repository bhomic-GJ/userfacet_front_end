import "./styles.css";
import List from "./components/List.js";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);

  const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
  };

  const json = (response) => response.json();

  function fetch_data(url) {
    fetch(url)
      .then(status)
      .then(json)
      .then((data) => {
        // console.log('Request succeeded with JSON response', data);

        setData(data.data);
      })
      .catch((error) => {
        //console.log('Request failed', error)
      });
  }

  useEffect(() => {
    fetch_data(
      " https://datausa.io/api/data?drilldowns=State&measures=Population"
    );
  });

  return (
    <div className="App">
      <h1>Userfacet</h1>
      <h2>Population Search</h2>

      <div className="main">
        <List data={data} />
      </div>
    </div>
  );
}
