import React from "react";

function DisplayResults({ elementsToDisplay, ChildComponent, action }) {
  return (
    <>
      {elementsToDisplay.map((element) => (
        <ChildComponent
          key={element._id}
          data={element}
          actionBtn={() => action(element)}
        />
      ))}
    </>
  );
}

export default DisplayResults;
