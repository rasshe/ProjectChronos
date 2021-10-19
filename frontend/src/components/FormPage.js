import React, { useState } from "react";

const FormPage = () => {
  const [listHidden, setListHidden] = useState(true);

  const handleSubmit = (e) => {
    setListHidden(false);
    e.preventDefault();
  };

  return (
    <>
      <h1>Form!</h1>
      <form>
        File: <input type="file" onChange={(e) => console.log(e)}></input>
        <button onClick={handleSubmit}>Upload</button>
        <div hidden={listHidden}>
          <h3>DL1: maths</h3>
          Time allocation: <input type="number"></input>
          <h3>DL2: programming 1</h3>
          Time allocation: <input type="number"></input>
          <br />
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default FormPage;
