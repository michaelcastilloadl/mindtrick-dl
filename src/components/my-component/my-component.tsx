import { Component, Prop, h, State, Method, Event, Watch, Listen } from '@stencil/core';
import { formatDate } from '../../utils/utils';
// import { MonthViewDay } from '../../model/mindtrick-dl'
// import 'moment';
import moment, { Moment } from 'moment';


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  // /* year */
  // @Prop() year: string;
  // /* month */
  // @Prop() month: string;
  // /* day */
  // @Prop() day: string;
  // /* Min Date */
  @Prop() date_min: string;
  /* Max Date */
  @Prop() date_max: string;
  /* Range */
  @Prop() range: string;
  /* Output Format */
  @Prop() output_format: string;
  /* Idioma */
  @Prop() locale: string;
  @Prop() weekdayshort: string[];
  @Prop() month_table: boolean;
  @Prop() year_table: boolean;
  @Prop() init_date: string;
  // columnHeaders: MonthViewDay[];
  formatNombres= {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sept_Oct_Nov_Dec'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom_Lun_Mar_Mier_Jue_Vier_Sab'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  };
  @State()
  state = {
    showCalendarTable: true,
    showMonthTable: this.month_table,
    dateObject: moment(this.init_date),
    allmonths: moment.months(),
    showYearNav: this.year_table,
    selectedDay: null
  }; 

  // @Event()
  // public monthChangePast: EventEmitter;
  
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };

  // @Watch('this.state')
  @Listen('this.state.dateObject')
  month = () => {
    this.state.dateObject.locale('es', this.formatNombres);
    return this.state.dateObject.format("MMMM");
  };
  
  // @State()
  showMonth = (e, month) => {
    // this.setState({
      console.log("Estado Menu Mes:" ,this.state.showMonthTable);
      this.state.showMonthTable = !this.state.showMonthTable;
      this.state.showCalendarTable = !this.state.showCalendarTable;
      console.log("Estado Menu Mes:" ,this.state.showMonthTable);
    // });
  };
  setMonth = month => {
    console.log(month)
    this.state.dateObject.locale('es', this.formatNombres);
    let monthNo = this.state.allmonths.indexOf(month);
    console.log(monthNo)
    let dateObject = Object.assign({}, this.state.dateObject);
    console.log(dateObject)
    dateObject = moment(dateObject).set("month", monthNo);
    console.log(dateObject)
    // this.setState({
      this.state.dateObject= dateObject;
      this.state.showMonthTable= !this.state.showMonthTable;
      this.state.showCalendarTable= !this.state.showCalendarTable;
    // });
  };
  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Escoge un mes</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearEditor = () => {
    // this.setState({
      console.log("Estado Menu Año:", this.state.showYearNav)
      this.state.showYearNav= !this.state.showYearNav;
      this.state.showCalendarTable= !this.state.showCalendarTable;
      console.log("Estado Menu Año:", this.state.showYearNav)
    // });
  };

  // onPrev = () => {
  // @Method()
  onPrev(){
    let curr = "";
    if (this.state.showMonthTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    // this.setState({
      let cu_date  = this.state.dateObject;
    console.log("Before:", cu_date.format('LLLL').toString());
      this.state.dateObject= this.state.dateObject.subtract(1, curr)
      // console.log("After:" ,this.state.dateObject)
      cu_date  = this.state.dateObject;
    console.log("After: ",cu_date.format('LLLL').toString())
    // });

    
  };
  @Method()
  // onNext = () => {
  onNext() {
    let curr = "";
    if (this.state.showMonthTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    // this.setState({
    let cu_date  = this.state.dateObject;
    console.log("Before:", cu_date.format('LLLL').toString());
      this.state.dateObject= this.state.dateObject.add(1, curr);
    cu_date  = this.state.dateObject;
    console.log("After: ",cu_date.format('LLLL').toString())
    // });
  };
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    // this.setState({
      dateObject= dateObject,
      this.state.showMonthTable= !this.state.showMonthTable,
      this.state.showYearNav= !this.state.showYearNav,
      this.state.showMonthTable= !this.state.showMonthTable
    // });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Escoge un año</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  private getDate(): string {
    return formatDate(this.year, this.month, this.day);
  }

  private currentDate(): string {
    return moment().format('LLLL').toString();
  }

  private minDate(): string {
    return moment(this.date_min).format('LLLL').toString();
  }

  private maxDate(): string {
    return moment(this.date_max).format('LLLL').toString();
  }

  private setFormat() {
    moment.locale('es', this.formatNombres);
  }
  onDayClick = (e, d) => {
  // onDayClick(event){
    this.state.selectedDay = d
    // console.log(this.state.dateObject.year(), this.state.dateObject.month()+1, this.state.selectedDay)
    let updatedDate = moment([this.state.dateObject.year(), this.state.dateObject.month(), d]);
    console.log(updatedDate.format('LLLL').toString())
    // console.log(event.target.data)
  };
  render() {
    this.state.dateObject = moment()
    this.setFormat();
    

    this.weekdayshort = moment.weekdaysShort();
    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      // let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={e => {
              this.onDayClick(e, d);
            }}
            // onClick={(event: UIEvent) => this.onDayClick(event)}
          >
            {d}
          </span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });
    

    return (
      <div>
      <div class="tail-datetime-calendar">
      <div className="calendar-navi">
          <span
            // onClick={e => {
            //   this.onPrev();
            // }}
            // onClick={(event: UIEvent) => this.onPrev(event)}
            // onClick={() => this.onPrev()}
            onClick={this.onPrev.bind(this)}
            class="calendar-button button-prev"
          />
          {!this.state.showMonthTable && !this.state.showYearEditor && (
            <span
              // onClick={e => {
              //   this.showMonth();
              // }}
              onClick={() => this.showMonth()}
              class="calendar-label"
            >
              {this.month()},
            </span>
          )}
          <span
            className="calendar-label"
            onClick={e => {
              this.showYearEditor();
            }}
          >
            {this.year()}
          </span>

          <span
            onClick={e => {
              this.onNext();
            }}
            className="calendar-button button-next"
          />
        </div>
        <div className="calendar-date">
          {this.state.showYearNav && <this.YearTable props={this.year()} />}
          {this.state.showMonthTable && (
            <this.MonthList data={moment.months()} />
          )}
        </div>
        {this.state.showCalendarTable && (
          <div className="calendar-date">
            <table className="calendar-day">
              <thead>
                <tr>{weekdayshortname}</tr>
              </thead>
              <tbody>{daysinmonth}</tbody>
            </table>
          </div>
        )}
      </div>
      <div>Hello { this.currentDate() }, Min {this.minDate()} and Max {this.maxDate()}</div>
      </div>
    )
    // this.weekdayshort.map(day => {
    // return (
    //   <th key={day} className="week-day">
    //     {day}
    //   </th>
    // );


    // return <div>
    //   Hello { this.currentDate() }, Min {this.minDate()} and Max {this.maxDate()}
    // </div>;
    // return <div>Hello, World! This Date {this.getDate()}</div>;


  }
}
