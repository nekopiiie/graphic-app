import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import React, { useState, createRef } from "react";
import Text from "../components/Text";
import { toJpeg } from "html-to-image";

const EditPage = () => {
  const [params] = useSearchParams();
  const [count, setCount] = useState(0);
  const memeRef = createRef();

  const addText = () => {
    setCount(count + 1);
  };

  const handleExport = () => {
    if (memeRef.current === null) {
      return;
    }

    const options = {
      quality: 1,
      backgroundColor: "#ffffff",
    };

    toJpeg(memeRef.current, options)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "meme.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Ошибка при сохранении изображения:", error);
      });
  };

  return (
    <div>
      {}
      <div
        ref={memeRef}
        style={{
          width: "700px", 
          //border: "1px solid"
        }}
      >
        <img src={params.get("url") || ""} width="100%" alt="Meme" />
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <Text key={index} />
          ))}
      </div>
      <Button onClick={addText}>Add Text</Button>
      <Button variant="success" onClick={handleExport}>
        Save
      </Button>
    </div>
  );
};

export default EditPage;