import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [intialName, editInitialName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    if (isEditing) {
      onChangeName(symbol, intialName);
    }
    setIsEditing((editing) => !editing);
  }

  function handleChange(eventObjFromOnChange) {
    editInitialName(eventObjFromOnChange.target.value);
  }

  let playerName = <span className="player-name">{intialName}</span>;
  if (isEditing) {
    playerName = (
      <input type="text" required value={intialName} onChange={handleChange} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
// if isediting is truthi which means the player is editing or inputing the name, then Save or False
