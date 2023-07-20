import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const today = new Date().getDate();

  const calendarDays = [];

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(
      <div key={i} className={`calendar-day ${i === today ? "highlight" : ""}`}>
        {i}
      </div>
    );
  }

  return (
    <>
      <div className="calendar-header">
        <div className="calendar-month">
          <p className="month">
            {currentDate.toLocaleString("default", { month: "long" })}
          </p>
          <p className="weekday">
            {currentDate.toLocaleString("default", { weekday: "long" })}
          </p>
          <p className="day">
            {currentDate.toLocaleString("default", { day: "2-digit" })}
          </p>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-weekdays">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="calendar-days">
          {[...Array(startDay)].map((_, index) => (
            <div key={index} className="calendar-day"></div>
          ))}
          {calendarDays}
        </div>
      </div>
    </>
  );
};

export default Calendar;
