import React, { useState, useEffect } from 'react';
import TradeList from './assets/components/TradeList';
import PerformanceMetrics from './assets/components/PerformanceMetrics';
import MaximumLossProfit from './assets/components/MaximumLossProfit';
import TradeForm from './assets/components/TradeForm';
import './App.css';


function App() {
  const [selectedStrategy, setSelectedStrategy] = useState('strategy1'); // State to store the selected strategy
  const [selectedTab, setSelectedTab] = useState("dataFor");
  const [strategyData, setStrategyData] = useState([]); 
  const [strategyData1, setStrategyData1] = useState([]); 
  const [strategyData2, setStrategyData2] = useState([]); 
  const [strategyData3, setStrategyData3] = useState([]); 

  // Function to handle strategy selection
  const handleStrategySelect = (strategy) => {
    //console.log("strategy ", strategy)
    setSelectedStrategy(strategy.strategy);
    //console.log("selectedStrategy ", selectedStrategy)
    // Fetch data for the selected strategy or set it from local data
    const dataForSelectedStrategy = fetchDataForStrategy(strategy); // Implement this function to fetch data for the selected strategy
    
  };

  // Function to fetch data for the selected strategy
  
  const fetchDataForStrategy = (strategy) => {
    // Replace this with your actual data fetching logic
    if (strategy.strategy === 'strategy1') {
      // Example data for Strategy 1
      setStrategyData1([...strategyData1,strategy]);
      console.log("strategyData1 ent", strategyData1)
    } else if (strategy.strategy === 'strategy2') {
      // Example data for Strategy 2
      setStrategyData2([...strategyData2,strategy]);
    } else if (strategy.strategy === 'strategy3') {
      // Example data for Strategy 3
      setStrategyData3([...strategyData3,strategy]);
    }
    else{
      return [
        { date: '2024-04-20', entryPrice: 110, exitPrice: 120, profitLoss: 10 },
        { date: '2024-04-21', entryPrice: 115, exitPrice: 105, profitLoss: -10 },
        // Add more data...
      ];
    }
  };

const handleChange =(e)=>{
  setSelectedStrategy(e.target.value)
 
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Portfolio Performance Dashboard</h1>
        {/* Use onClick event handler to handle tab switching */}
        <a href='#' onClick={() => setSelectedTab('dashboard')}>Dashboard</a>
        <a href='#' onClick={() => setSelectedTab('dataForm')}>DataForm</a>
      </header>
      <label>Select Strategy:</label>
      <select value={selectedStrategy} name = "strategy" onChange={handleChange}>
        <option value="strategy">Select Strategy</option>
        <option value="strategy1">Strategy 1</option>
        <option value="strategy2">Strategy 2</option>
        <option value="strategy3">Strategy 3</option>
      </select>
      <div className="container">
      
        {/* Conditionally render TradeForm or TradeList based on selectedTab */}
        {selectedTab === "dataForm" ? (
          <TradeForm onAddTrade={strategyData} handleStrategySelect={handleStrategySelect} />
        ) : (
          // Conditionally render TradeList, PerformanceMetrics, and MaximumLossProfit based on selectedStrategy
          selectedStrategy === 'strategy1' ? (
            <>
              <TradeList trades={strategyData1} />
              <PerformanceMetrics trades={strategyData1} />
              <MaximumLossProfit trades={strategyData1} />
            </>
          ) : selectedStrategy === 'strategy2' ? (
            <>
              <TradeList trades={strategyData2} />
              <PerformanceMetrics trades={strategyData2} />
              <MaximumLossProfit trades={strategyData2} />
            </>
          ) : (
            <>
              <TradeList trades={strategyData3} />
              <PerformanceMetrics trades={strategyData3} />
              <MaximumLossProfit trades={strategyData3} />
            </>
          )
        )}
      </div>
    </div>
  );
  
  
}

export default App;