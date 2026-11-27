interface data {
  type: boolean;
  date: number;
  day: string;
  hasEvent: boolean;
}

const WorshipSchedule = ({ type, date, day, hasEvent }: data) => {
  let style = {};
  if (type) {
    style = {
      background: "var(--primary)",
      color: "white",
      fontWeight: "600 !important",
    };
  } else {
    style = { color: "var(--gray)" };
  }

  return (
    <div
      style={style}
      className="relative w-16.5 flex flex-col p-[0.75rem_1.125rem] gap-1 items-center rounded-2xl flex-1"
    >
      {hasEvent && (
        <div className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2"></div>
      )}
      <h3 className="text-[1.25rem] font-medium tracking-min-2 text-center">
        {date}
      </h3>
      <h4 className="text-[1rem] font-regular tracking-min-2 text-center">
        {day}
      </h4>
    </div>
  );
};

export default WorshipSchedule;
