import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, allActions }) => {

  let isEdit = false;
  if (defaultValue) {
    isEdit = true;
  }

  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      type: "",
      instruction: "",
    }
  );
  const [errors, setErrors] = useState("");

  const hasRepeatName = (userInputName) => {
    for (let i=0; i<allActions.length; i++) {
      if (userInputName === allActions[i].name) {
        return true;
      }
    }
    return false;
  } 

  const validateForm = () => {
    let ret = true;
    let errorMessages = [];
    if (isEdit) {
      if (!formState.name) {
        errorMessages.push('Please provide a name.');
        ret = false;
      }
      if (formState.type == "SubmitBotInstruction" && !formState.instruction) {
        errorMessages.push('Please provide an instruction');
        ret = false;
      }
    } 
    else {
      if (!formState.name) {
        errorMessages.push('Please provide a name.');
        ret = false;
      }
      if (!formState.type) {
        errorMessages.push('Please select a type.');
        ret = false;
      }
      if (formState.type === "SubmitBotInstruction" && !formState.instruction) {
        errorMessages.push('Please provide an instruction.');
        ret = false;
      }
      if (hasRepeatName(formState.name)) {
        errorMessages.push('Name existed. Please change a name.');
        ret = false;
      }
      if (formState.type !== "SubmitBotInstruction" && formState.instruction) {
        errorMessages.push('No instructions are allowed for this type.');
        ret = false;
      }
    }
    setErrors(errorMessages.join(" | "));
    return ret;
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          { !isEdit &&
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  onChange={handleChange}
                  value={formState.type}
                >
                  <option value=""></option>
                  <option value="MakeOffer">MakeOffer</option>
                  <option value="SubmitBotInstruction">SubmitBotInstruction</option>
                  <option value="AcceptOffer">AcceptOffer</option>
                </select>
              </div> }
          
          { 
            (!isEdit || formState.type === "SubmitBotInstruction") &&
              <div className="form-group">
                <label htmlFor="instruction">Instruction</label>
                <textarea
                  name="instruction"
                  onChange={handleChange}
                  value={formState.instruction}
                />
              </div>
          }

          {errors && <div className="error">{`${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};