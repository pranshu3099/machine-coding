import AndCounter from "./andcount";
import Carousel from "./carousel";
import ThirdCharacterDisplay from "./character";
import Paragraph from "./paragraph";
import PrimeNumbers from "./primenumbers";
import Quiz from "./quiz";
import Pagination from "./pagination";
import AutoComplete from "./autocomplete";
import { useState } from "react";
import Toggle from "./toggle";
import StarRating from "./starrating";
import json from "./data.json";
import FileExplorer from "./fileexplorer";
function App() {
  const images = [
    "https://via.placeholder.com/600x300/FF5733/ffffff?text=Slide+1",
    "https://via.placeholder.com/600x300/33FF57/ffffff?text=Slide+2",
    "https://via.placeholder.com/600x300/5733FF/ffffff?text=Slide+3",
  ];

  const [List, setList] = useState(json);

  // const [isOn, setIsOn] = useState(false);

  // function handleToggle() {
  //   setIsOn(!isOn);
  // }

  // function handleChange(value) {
  //   console.log(value);
  // }

  const addNodeToList = (parentId) => {
    let name = prompt("Enter folder or file name");

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setList((prev) => updateTree(prev));
  };

  const removeNode = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setList((prev) => updateTree(prev));
  };

  return (
    <>
      {/* <Carousel images={images} />
      <Paragraph />
      <ThirdCharacterDisplay />
      <AndCounter />
      <PrimeNumbers number={8} /> */}
      {/* <Quiz /> */}
      {/* <AutoComplete /> */}
      {/* <Toggle isOn={isOn} onToggle={handleToggle} label="Hello" /> */}
      {/* <StarRating value={0} onChange={handleChange} /> */}
      <FileExplorer
        list={List}
        originalList={List}
        setList={setList}
        addNodeToList={addNodeToList}
        removeNode={removeNode}
      />
    </>
  );
}

export default App;
