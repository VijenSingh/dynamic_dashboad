import React from 'react';
import '../css/maximumLossProfit.css'

function MaximumLossProfit({ trades }) {
  // Find maximum loss and profit
  const maxProfit = Math.max(...trades.map(trade => (trade.exitPrice - trade.entryPrice) * trade.quantity));
  const maxLoss = Math.min(...trades.map(trade => (trade.exitPrice - trade.entryPrice) * trade.quantity));

  return (
    <div className="maximum-loss-profit">
      <h2>Maximum Loss and Profit</h2>
      <p>Maximum Profit: {maxProfit}</p>
      <p>Maximum Loss: {maxLoss}</p>
    </div>
  );
}

export default MaximumLossProfit;
