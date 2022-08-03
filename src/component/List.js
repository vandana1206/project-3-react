import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ item, remItem, updateItem }) => {
  return (
    <div>
      {item.map((i) => {
        const { id, title } = i;
        return (
          <article key={id}>
            <p>{title}</p>
            <div>
              <button
                type="button"
                onClick={() => {
                  updateItem(id);
                }}
              >
                <FaEdit />
              </button>
              <button type="button" onClick={() => remItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
