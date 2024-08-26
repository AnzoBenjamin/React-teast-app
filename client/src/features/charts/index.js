import LineChart from "./components/LineChart";
import StackBarChart from "./components/StackBarChart";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";

function Charts() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  return (
    <>
      <Datepicker
        containerClassName="w-72"
        value={dateValue}
        theme={"light"}
        inputClassName="input input-bordered w-72"
        popoverDirection={"down"}
        toggleClassName="invisible"
        onChange={handleDatePickerValueChange}
        showShortcuts={true}
        primaryColor={"white"}
      />
      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <StackBarChart />
        <LineChart />
      </div>
    </>
  );
}

export default Charts;
