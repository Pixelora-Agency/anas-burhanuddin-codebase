
interface data {
  text: string;
  active: boolean;
}

const NavMenu = ({ text, active }: data) => {
  let cssStyle = {};
  if (active) {
    cssStyle = {
      color: "white",
      padding: "0.75rem 1.5rem",
      background: "var(--primary)",
    };
  }

  return (
    <div
      className={`rounded-[40rem] text-[1rem] font-medium tracking-min-4 leading-c-120 text-gray
        flex items-center justify-center select-none cursor-pointer
        ${!active && "hover:-translate-y-1"} duration-400`}
      style={cssStyle}
    >
      {text}
    </div>
  );
};

export default NavMenu;
