import React, { FC, useState } from "react";
import Pizza from "../models/Pizza";
import "./styles.css";

interface EdditPizzaFormProps {
  data: Pizza;
  updatePizza: (newPizza: Pizza) => void;
  edditForm: () => void;
}

const EdditPizzaForm: FC<EdditPizzaFormProps> = ({
  data,
  updatePizza,
  edditForm,
}) => {
  const [edditPizza, setEdditPizza] = useState<Pizza>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "img" && files && files.length > 0) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEdditPizza((prevState) => ({
            ...prevState,
            img: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setEdditPizza((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, price, img } = edditPizza;
    if (title && price && img) {
      updatePizza(edditPizza);
      edditForm();
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Название"
        onChange={handleChange}
        value={edditPizza.title}
      />
      <input
        name="price"
        type="text"
        placeholder="Стоимость"
        onChange={handleChange}
        value={edditPizza.price}
      />
      <input name="img" type="file" accept="image/*" onChange={handleChange} />
      <button type="submit">Подтвердить</button>
    </form>
  );
};

export default EdditPizzaForm;
