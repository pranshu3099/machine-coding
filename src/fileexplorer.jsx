import { useState, useEffect } from "react";
const FileExplorer = ({
  list,
  originalList,
  setList,
  addNodeToList,
  removeNode,
}) => {
  const [isexpanded, setIsExpanded] = useState({});
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
