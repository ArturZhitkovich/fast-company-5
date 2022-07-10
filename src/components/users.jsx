import React, { useState } from "react";
import API from "../API";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (userId) => {
    console.log(userId);
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const phrase = [
      " человек тусанет",
      " человека тусанут",
      " человек тусанет",
    ];
    let cases = [2, 0, 1, 1, 1, 2];
    return number
      ? number +
          phrase[
            number % 100 > 4 && number % 100 < 20
              ? 2
              : cases[number % 10 < 5 ? number % 10 : 5]
          ] +
          " с тобой сегодня"
      : "Никто не тусанет с тобой";
  };

  const isHasUsers = users.length !== 0;
  const getBadgeClasses = (isHasUsers) => {
    let classes = " badge fw-bold d-inline-block mt-2 p-2 m-2 text-white ";
    return isHasUsers ? classes + "bg-primary" : classes + "bg-danger";
  };

  const renderQualities = (qualities) => {
    return qualities.map((qualitie) => {
		// console.log(qualities)
		// console.log(qualitie)
      return (
        <span key={qualitie.name} className={`badge m-1 bg-${qualitie.color}`}>
          {qualitie.name}
        </span>
      );
    });
  };

  let userParameters = users.map((item) => {
	console.log(item.qualities)
    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{renderQualities(item.qualities)}</td>
        <td>{item.profession.name}</td>
        <td>{item.completedMeetings}</td>
        <td>{item.rate} /5</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(item._id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h3>
        <span className={getBadgeClasses(isHasUsers)}>
          {renderPhrase(users.length)}
        </span>
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{userParameters}</tbody>
      </table>
    </>
  );
};

export default Users;
