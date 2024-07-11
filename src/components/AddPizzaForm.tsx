import React, { FC, useState } from "react";
import Pizza from "../models/Pizza";
import "./styles.css";

interface AddPizzaFormProps {
  addPizza: (newPizza: Pizza) => void;
}

const initState = {
  title: "",
  price: "",
  img: "",
};

const AddPizzaForm: FC<AddPizzaFormProps> = ({ addPizza }) => {
  const [newPizza, setNewPizza] = useState<{
    title: string;
    price: string;
    img: string;
  }>(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "img" && files && files.length > 0) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewPizza((prevState) => ({
            ...prevState,
            img: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewPizza((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, price, img } = newPizza;
    if (title && price && img) {
      addPizza({
        ...newPizza,
        price: Number(price),
        id: Date.now(),
      });

      setNewPizza(initState);

      console.log(newPizza);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Название"
        onChange={handleChange}
        value={newPizza.title}
      />
      <input
        name="price"
        type="text"
        placeholder="Стоимость"
        onChange={handleChange}
        value={newPizza.price}
      />
      <input
        name="img"
        type="file"
        accept="image/*"
        placeholder="Изображение"
        onChange={handleChange}
      />
      <button type="submit">+ Добавить в меню</button>
    </form>
  );
};

export default AddPizzaForm;
