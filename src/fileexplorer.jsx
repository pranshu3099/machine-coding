import { useState, useEffect } from "react";
import json from "./data.json";
const FileExplorer = ({
  list,
  originalList,
  setList,
  addNodeToList,
  removeNode,
}) => {
  const [isexpanded, setIsExpanded] = useState({});
  // const getParentId = (list, id, parentId = null) => {
  //   for (let i = 0; i < list.length; i++) {
  //     if (list[i].id === id) {
  //       return parentId;
  //     }
  //     if (list[i]?.children) {
  //       const result = getParentId(list[i].children, id, list[i].id);
  //       if (result !== null) return result;
  //     }
  //   }
  //   return null;
  // };

  // function updateFolder(list, parentId, updatedList) {
  //   return list.map((item) => {
  //     if (item.id === parentId) {
  //       return { ...item, children: updatedList };
  //     }
  //     if (item.children) {
  //       return {
  //         ...item,
  //         children: updateFolder(item.children, parentId, updatedList),
  //       };
  //     }
  //     return item;
  //   });
  // }

  // const handleRemove = (id, isFolder) => {
  //   if (isFolder) {
  //     const newList = originalList.filter((item) => {
  //       return item.id !== id;
  //     });
  //     setList(newList);
  //   } else {
  //     let parentId = getParentId(originalList, id);
  //     if (parentId === null) {
  //       let newList = originalList.filter((item) => item.id !== id);
  //       setList(newList);
  //     } else {
  //       const parentList = originalList.filter((item) => {
  //         return item.id === parentId;
  //       });
  //       const updatedList = parentList?.[0]?.children?.filter((item) => {
  //         return item.id !== id;
  //       });
  //       const updatedTree = updateFolder(originalList, parentId, updatedList);
  //       setList(updatedTree);
  //     }
  //   }
  // };
  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              style={{ cursor: "pointer", fontSize: "25px" }}
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isexpanded?.[node.name] ? "-" : "+"}{" "}
            </span>
          )}
          <span> {node.name}</span>
          <span
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => {
              removeNode(node.id);
            }}
          >
            {" "}
            delete
          </span>

          {node.isFolder && (
            <span onClick={() => addNodeToList(node.id)}>
              {" "}
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/000/440/965/original/vector-folder-icon.jpg"
                }
                style={{ width: "25px", cursor: "pointer" }}
              />
            </span>
          )}

          {isexpanded?.[node.name] && node?.children && (
            <FileExplorer
              list={node.children}
              originalList={originalList}
              setList={setList}
              addNodeToList={addNodeToList}
              removeNode={removeNode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FileExplorer;
