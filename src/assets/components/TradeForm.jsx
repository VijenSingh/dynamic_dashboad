import React, { useState } from 'react';
import '../css/tradeForm.css';


function TradeForm({ onAddTrade ,handleStrategySelect}) {
  const [formData, setFormData] = useState({
    strategy: '',
    date: '',
    entryPrice: '',
    exitPrice: '',
    quantity: '', // New input field for quantity
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log("e.target", e.target);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data before submitting
    if (formData.date && formData.entryPrice && formData.exitPrice && formData.quantity) {
      // Convert quantity to number
      const quantity = parseInt(formData.quantity);
      
      handleStrategySelect(formData)
      
      // Reset form data
      setFormData({
        strategy:'',
        date: '',
        entryPrice: '',
        exitPrice: '',
        quantity: '',
      });
      //console.log("formData",formData)
      
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form className="trade-form" onSubmit={handleSubmit}>
      <h2>Add Trade</h2>
      <div>
      <label>Select Strategy:</label>
      <select value={formData.strategy} name = "strategy" onChange={handleChange}>
        <option value="strategy">Select Strategy</option>
        <option value="strategy1">Strategy 1</option>
        <option value="strategy2">Strategy 2</option>
        <option value="strategy3">Strategy 3</option>
      </select>
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </div>
      <div>
        <label>Entry Price:</label>
        <input type="number" name="entryPrice" value={formData.entryPrice} onChange={handleChange} />
      </div>
      <div>
        <label>Exit Price:</label>
        <input type="number" name="exitPrice" value={formData.exitPrice} onChange={handleChange} />
      </div>
      <div>
        <label>Quantity:</label> {/* New input field for quantity */}
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      </div>
      <button type="submit">Add Trade</button>
    </form>
  );
}

export default TradeForm;
