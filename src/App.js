import React from 'react';
import Calendar from './components/Calendar'; 
import Header from './components/layouts/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Calendar style={calendarStyle}/> 
    </div>
  );
}

const calendarStyle = {
  position: "relative",
  margin: "50px auto",
  width: "700px",
  border: "1px solid #f5f5f5"
}

export default App;
