import React, { useState, useRef, useEffect } from "react";

const Text = () => {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double Click to Edit");
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const inputRef = useRef(null); 

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        marginTop: "100px",
        marginLeft: "500px" 
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {editMode ? (
        <textarea
          ref={inputRef}
          onBlur={() => setEditMode(false)} 
          value={val}
          onChange={(e) => setVal(e.target.value)}
          style={{
            width: "100%",
            height: "100px", 
            resize: "vertical", 
          }}
        />
      ) : (
        <h1
          onDoubleClick={() => setEditMode(true)}
          style={{ whiteSpace: "pre-wrap" }} 
        >
          {val}
        </h1>
      )}
    </div>
  );
};

export default Text;