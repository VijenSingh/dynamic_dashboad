import React from 'react';
import '../css/performanceMetrics.css'

function PerformanceMetrics({ trades }) {
  // Calculate performance metrics
  const totalTrades = trades.length;
let totalProfit = 0;

// Calculate total profit
totalProfit = trades.reduce((acc, trade) => {
  const profitLoss = (trade.exitPrice - trade.entryPrice) * trade.quantity;
  //console.log("trade profitLoss", profitLoss);
  return acc + profitLoss;
}, 0);

//console.log("totalProfit", totalProfit);


  const averageProfit = totalProfit / totalTrades;

  return (
    <div className="performance-metrics">
      <h2>Performance Metrics</h2>
      <p>Total Trades: {totalTrades}</p>
      <p>Total Profit: {totalProfit}</p>
      <p>Average Profit per Trade: {averageProfit.toFixed(2)}</p>
    </div>
  );
}

export default PerformanceMetrics;
