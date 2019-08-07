import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    }
  
    state = {
    dateObject: moment(),
    today: moment(),
    showMonthList: false,
    showYearSelect: false
    };
  
    
    weekdays = moment.weekdays();
    weekdaysShort= moment.weekdaysShort();  
    months = moment.months();
  
    // define the functions of moment.js
    year = () => {
      return this.state.dateObject.format("Y");
    } 
    month = () => {
      return this.state.dateObject.format("MMMM");
    }
    daysInMonth = () => {
      return this.state.dateObject.daysInMonth();
    }   
    currentDay = () => {
      return this.state.dateObject.format("D");
    }

    firstDayOfMonth = () => {
      let dateObject = this.state.dateObject;
      let firstDay = moment(dateObject).startOf('month').format('d');
      return firstDay;
    }

    // function refers to previous & next month
    onPrev = () => {
      let moveMonth = "month";
      this.setState({
        dateObject: this.state.dateObject.subtract(1, moveMonth)
      });
    };

    onNext = () => {
      let moveMonth = "month";
      this.setState({
        dateObject: this.state.dateObject.add(1, moveMonth)
      });
    };

    // create month list
    monthList = (props) => {
      let month = [];
      props.data.map(data => {
        month.push(
          <td key={data} className="calendar-month" onClick={e => {this.setMonth(data);}}>
            <span>{data}</span>
          </td>
        );
      });

      let rows = [];
      let cells = [];

      month.forEach((row, i) => {
        if (i % 3 !== 0 || i == 0) {
          cells.push(row);
        }else {
          rows.push(cells);
          cells = [];
          cells.push(row);
        }
      });
      rows.push(cells);

      let monthList = rows.map((d, i) => {
        return <tr>{d}</tr>;
      });

      return (
        <table className="calendar-month">
          <thead>
            <tr>
              <th colSpan="3" className="center">Select a month</th>
            </tr>
          </thead>
          <tbody>
            {monthList}
          </tbody>
        </table>
      )
    }

    setMonth = (month) => {
      let monthNo = this.months.indexOf(month);
      let dateObject = Object.assign({}, this.state.dateObject);
      dateObject = moment(dateObject).set("month", monthNo);
      this.setState({
        dateObject: dateObject
      });
    };

    appendMonthList = (e, month) => {
      this.setState({
        showMonthList: !this.state.showMonthList
      });
    };

    // create Year Selector
    showYearSelector = () => {
      this.setState({
        showYearSelector: true
      });
    }

    setYear = (year) => {
      let dateObject = Object.assign({}, this.state.dateObject);
      dateObject = moment(dateObject).set("year", year);
      this.setState({
        dateObject: dateObject
      });
    };

    onChangeYear = (e) => {
      this.setYear(e.target.value);
      this.props.onChangeYear && this.props.onChangeYear(e, e.target.value);
    };

    onKeyUpYear = (e) => {
      if (e.which ===  13 || e.which === 27) {
        this.setYear(e.target.value);
        this.setState({
          showYearSelector: false
        })
      };
    };

    YearSelector = () => {
      return (
        this.state.showYearSelector 
        ? <input  defaultValue= {this.year()}
                 className="input-field"
                 ref={(yearInput) => {this.yearInput = yearInput}}
                 onKeyUp= {(e) => this.onKeyUpYear(e)}
                 onChange= {(e) => this.onChangeYear(e)}
                 type= "number"
                 placeholder="year" />
        
        : <div className="calendar-year"
            onClick= {(e) => {this.showYearSelector()}}>
            {this.year()}
          </div>
      )
    };


  render() {
    let weekdays = this.weekdaysShort.map((day) => {
      return (
       <td key={day} className="weekday center">{day}</td>
      )
    });
    
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="emptySlot #f666">
        {""}
        </td>
      );
    };

    let getDays = [];
    for (let d = 1; d<= this.daysInMonth(); d++) {
      let currentDay = (d == this.currentDay() ? "today" : "");

      getDays.push(
        <td key={d} className={`calendar-day center ${currentDay}`} >
          {d}
        </td>
      );
    };

    var totalDays = [...blanks, ...getDays];
    let rows = [];
    let cells = [];

    totalDays.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      }else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalDays.length - 1) {
        rows.push(cells);
      }
    })

    let days = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <div className="calendar-container" style={this.style}>
        <table className="calendar-table z-depth-4">
          <thead className="calendar-header #004d40 teal darken-1">
            <tr className="white-text">
              <td colSpan="7" className="month-name">
                <span onClick={(e) => {
                  this.onPrev();
                  }}
                  className="calendar-button button-prev far fa-arrow-alt-circle-left" />
                <div className="month-title" onClick={(e) => {this.appendMonthList();}}>
                  {this.month()}
                  <span>
                    <i className="fa fa-chevron-down down-list"></i>
                  </span>
                  {this.state.showMonthList && <this.monthList data={moment.months()} />}  
                </div>
                <this.YearSelector />
                <span onClick={(e) => {
                this.onNext();
                }}
                className="calendar-button button-next far fa-arrow-alt-circle-right" />
                
              </td>      
            </tr>
          </thead>  

          {!this.state.showMonthList && (
            <tbody>
            <tr className="#26a69a teal lighten-1 white-text">
             {weekdays}
            </tr>
            {days}
          </tbody> 
          )}
        </table>  
      </div>
    )
  }
}

export default Calendar;
