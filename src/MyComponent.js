import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function MyComponent() {
     const [error, setError] = useState(null);
     const [isLoaded, setIsLoaded] = useState(false);
     const [items, setItems] = useState([]);

     useEffect(() => {
       fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1", {
         method: "get",
         headers: {
           "Content-Type": "application/json",
         },
       })
         .then((res) => res.json())
         .then(
           (result) => {
             setIsLoaded(true);
             setItems(result);
           },
           (error) => {
             setIsLoaded(true);
             setError(error);
           }
         );
     }, []);

     if (error) {
       return <div>Ошибка: {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Загрузка...</div>;
     } else {
      return (
        <Table bordered className="table-sm">
          <thead>
            <tr>
              <th>id</th>
              <th>symbol</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item) => {
            if(item.symbol === 'usdt'){
                return <tr className="table-success" key={item.market_cap_rank}>
                <td>{item.id}</td>
                <td>{item.symbol}</td>
                <td>{item.name}</td>
                </tr>
            }
            else if(item.market_cap_rank <= 5){ 
                return <tr className="table-info" key={item.market_cap_rank}>
                <td>{item.id}</td>
                <td>{item.symbol}</td>
                <td>{item.name}</td>
                </tr>
            }
            else {
                return <tr key={item.market_cap_rank}>
                <td>{item.id}</td>
                <td>{item.symbol}</td>
                <td>{item.name}</td>
                </tr>
            }
            })}
          </tbody>
        </Table>
      );}
}

export default MyComponent;
