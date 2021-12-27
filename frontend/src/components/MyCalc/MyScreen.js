import "./myscreen.css";

const MyScreen = ({ value }) => {
  return (
    <div className="myscreen" mode="single" max={70}>
      {value}
    </div>
  );
};

export default MyScreen;