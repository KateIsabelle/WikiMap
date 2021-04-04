module.exports = (db) => {

const getUsers = function () {
  db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(error => console.log(error))
};

  const addUser = function (user) {
    const query = `
    INSERT into users (name, email, password)
    VALUES($1, $2, $3) RETURNING *;
    `;
    const values = [user.name, user.email];

    return db
      .query(query, values)
      .then((res) => res.rows[0])
      .catch((error) => error);
  };
}
