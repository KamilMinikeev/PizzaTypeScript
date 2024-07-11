import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import Pizza from "../models/Pizza";
import EdditPizzaForm from "./EdditPizzaForm";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface SinglePizzaProps {
  pizza: Pizza;
  updatePizza: (newPizza: Pizza) => void;
  deletePizza: (newPizza: Pizza) => void;
}

const SinglePizza: FC<SinglePizzaProps> = ({
  pizza,
  updatePizza,
  deletePizza,
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  const edditForm = () => {
    setEdit(!edit);
  };

  return (
    <div className="pizza">
      <img src={pizza.img} alt={pizza.title} />
      <h2 className="">
        <Link to={`/pizza/${pizza.id}`}>{pizza.title}</Link>
      </h2>
      <span>{pizza.price} ₽ </span>
      <div className="pizza-controls">
        <AiFillEdit onClick={edditForm} />
        <AiFillDelete onClick={() => deletePizza(pizza)} />
      </div>
      {edit ? (
        <EdditPizzaForm
          data={pizza}
          updatePizza={updatePizza}
          edditForm={edditForm}
        />
      ) : null}
    </div>
  );
};

export default SinglePizza;
