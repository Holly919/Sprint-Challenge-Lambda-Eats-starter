import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field")
    .min(2, "Name must have at least 2 characters")
 });

export default function Form() {
  const [orderState, setOrderState] = useState({
    name: "",
    size: "",
    pineapple: "",
    pepperoni: "",
    olive: "",
    mushroom: "",
    onion: "",
    instructions: ""
  });

  const [errors, setErrors] = useState({
    name: ""
   
  });


  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(orderState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [orderState]);

  const validateChange = event => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors
        });
      });
  };

  const inputChange = event => {
    event.persist();
    const newFormData = {
      ...orderState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    };
    validateChange(event);
    setOrderState(newFormData);
  };

  const inputChange2 = event => {
    event.persist();
    const newFormData = {
      ...orderState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    };
    setOrderState(newFormData);
  };

  const formSubmit = event => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", orderState)
      .then(res => {
        setPost(res.data);
    
        setOrderState({
          name: "",
          size: "",
          pineapple: "",
          pepperoni: "",
          olive: "",
          mushroom: "",
          onion: "",
          instructions: ""
        });
      })
      .catch(err => {
        console.log(err.res);
      });
  };

  return (
    <div className="pizzaForm">
 
      <h2>Build Your Own Pizza</h2>
      <form onSubmit={formSubmit} className="buildForm" id="buildForm">
        <h3>Personal Info</h3>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          name="name"
          value={orderState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? (
          <p data-cy="nameError" className="error">
            {errors.name}
          </p>
        ) : null}
        <h3>What size?</h3>
        <label htmlFor="size">Size: </label>
        <select
          id="size"
          name="size"
          value={orderState.size}
          onChange={inputChange2}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          
        </select>
        <h3>Choose your toppings!</h3>
        <label htmlFor="toppings[]">Choose up to 3: </label>
        <label>
          <input
            type="checkbox"
            name="pineapple"
            value="Pineapple"
            onChange={inputChange2}
          />
          Pineapple
        </label>
        <label>
          <input
            type="checkbox"
            name="pepperoni"
            value="Pepperoni"
            onChange={inputChange2}
          />
          Pepperoni
        </label>
        <label>
          <input
            type="checkbox"
            name="olive"
            value="olive"
            onChange={inputChange2}
          />
          Olive
        </label>
        <label>
          <input
            type="checkbox"
            name="mushroom"
            value="Mushroom"
            onChange={inputChange2}
          />
          Mushroom
        </label>
        <label>
          <input
            type="checkbox"
            name="onion"
            value="Onion"
            onChange={inputChange2}
          />
          Onion
        </label>
       
        <h3>Special Instructions?</h3>
        <label htmlFor="instructions">Special Instructions: </label>
        <textarea
          id="instructions"
          type="text"
          name="instructions"
          value={orderState.instructions}
          onChange={inputChange2}
        />
        <button className="submitBtn" disabled={buttonDisabled}>
          Submit Order
        </button>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </form>
    </div>
  );
}