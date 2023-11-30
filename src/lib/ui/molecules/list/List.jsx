/* eslint-disable react/prop-types */
import React from "react";

export default function List({ items }) {
  if (!items || !items.length) {
    return <></>;
  }
  return (
    <List>
      {items.map((item) => {
        return (
          <li key={item.name}>
            <span>{item.name}</span>
            {item.abilities.length ? (
              <ul>
                {item.abilities.map((ability) => {
                  return <li key={ability.name}>{ability.name}</li>;
                })}
              </ul>
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </List>
  );
}
