import Dollar from "../../assets/Dollar.svg";
import Arrow from "../../assets/Arrow.svg";
import Message from "../../assets/Message.svg";
import Presentation from "../../assets/Presentation.svg";

interface ITodoCard {
  width?: number;
  height?: number;
  name: string;
  category: "study" | "work" | "finance" | "other";
  time: string;
  date: string;
  goal: "1" | "2" | "3" | "4" | "5";
  repeat: "daily" | "weekly" | "monthly";
}

export const TodoCard = ({ width = 162, height = 168, category, name, handleEditTodo, id }: any) => {
  const todoCardStyle = {
    width,
    height,
  };
  const randomBg = ["bg-purple-300", "bg-red-400", "bg-fuchsia-300", "bg-sky-300", "bg-green-300"];

  const tailwindStyles = `flex flex-col justify-between px-3 py-6  rounded-2xl align-center cursor-pointer  ${
    randomBg[Math.ceil(Math.random() * 4)]
  }`;

  const categoryImg = (categoryType: ITodoCard["category"]) => {
    switch (categoryType) {
      case "study":
        return Message;
      case "work":
        return Presentation;
      case "finance":
        return Dollar;
      default:
        return Message;
    }
  };

  return (
    <div className={tailwindStyles} style={todoCardStyle} onClick={() => handleEditTodo(id)}>
      <div className="flex justify-between category-container align-center">
        <img src={categoryImg(category)} alt="finance" />
        <img src={Arrow} alt="finance" style={{ height: 11 }} />
      </div>
      <div className="name-container ">
        <p className="text-black">{name}</p>
      </div>
    </div>
  );
};
