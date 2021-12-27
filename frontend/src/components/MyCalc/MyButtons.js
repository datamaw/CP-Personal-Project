
import "./mybuttons.css";

const MyButtons = ({ className, value, onClick }) => {
  return (
    <button className={className} value={value} onClick={onClick}>
    </button>
  );
};

export default MyButtons;