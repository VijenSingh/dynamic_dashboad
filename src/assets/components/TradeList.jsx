import React,{useRef,useEffect} from 'react';
import Chart from 'chart.js/auto';
import '../css/tradeList.css'


function TradeList({ trades}) {
  // Calculate cumulative profit/loss
  //console.log("strategy TradeList", trades)
  const calculateCumulativePL = () => {
    let cumulativePL = 0;
    let profitLoss =0;
    return trades.map((trade) => {
      profitLoss = (trade.exitPrice-trade.entryPrice)*parseInt(trade.quantity);
      cumulativePL += profitLoss;
      return { ...trade,profitLoss, cumulativePL };
    });
  };

  const tradesWithCumulativePL = calculateCumulativePL();
//console.log("tradesWithCumulativePL ",tradesWithCumulativePL)
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || tradesWithCumulativePL.length === 0) return;

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const cumulativePLData = tradesWithCumulativePL.map((trade) => trade.cumulativePL);
    const dates = tradesWithCumulativePL.map((trade) => trade.date);

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Cumulative Profit/Loss',
            data: cumulativePLData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Cumulative Profit/Loss',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [tradesWithCumulativePL]);

  return (
    <div className="trade-list">
      <h2>Trade List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Entry Price</th>
            <th>Exit Price</th>
            <th>Quantity</th>
            <th>Profit/Loss</th>
            <th>Cumulative Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {tradesWithCumulativePL.map((trade, index) => (
            <tr key={index}>
              <td>{trade.date}</td>
              <td>{trade.entryPrice}</td>
              <td>{trade.exitPrice}</td>
              <td>{trade.quantity}</td>
              <td>{trade.profitLoss}</td>
              <td>{trade.cumulativePL}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default TradeList;