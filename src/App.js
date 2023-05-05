import { useState } from "react";

import "./App.css";
import config from "./assets/config.json";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const allActions = config.actions;
  const [rows, setRows] = useState(allActions);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  const handleExport = () => {
    let res = [];
    res.push({"name" : config.name});
    res.push({"version" : config.version});
    res.push(rows);
    console.log(res);
  }
  return (
    <div className="App">

      <br/>
      <span><b>Config name:</b> {config.name}</span>
      <br/>
      <br/>
      <span><b>Config version:</b> {config.version}</span>
      <br/>
      <br/>

      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <br />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add an action
      </button>
      <br />
      <br />
      <button onClick={handleExport}>
        Export to console
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          allActions = {allActions}
        />
      )}
    </div>
  );
}

export default App;