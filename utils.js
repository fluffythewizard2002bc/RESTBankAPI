const fs = require("fs");

const getAllUsers = () => {
  try {
    const dataBuffer = fs.readFileSync(`./DB/data.json`);
    //console.log(dataBuffer);
    const dataJSON = dataBuffer.toString();
    //console.log(dataJSON);
    const obj = JSON.parse(dataJSON);
    //console.log(obj);
    return obj;
  } catch (e) {
    return [];
  }
};
const getUser = (id) => {
  const users = getAllUsers();
  users.find((user) => {
    console.log("looking for: ",id );
    if (user.id === +id) return user;
    throw Error(`Account doesn't exist`);
  });
  
};
const addUser = (body) => { //best practice is to send the object you created back
  console.log(body);
 
  const users = getAllUsers();
  users.find((user) => {
    if (user.id === body.id) throw Error(`Duplicate found in id!`);
    //more error throws if age missing or whateer
  });
  console.log(body);

  ///! tests to all key and properties

  //*ALL good
  //const newUser={id:body.ID};
  users.push(body);
  saveUsers(users);
  return stringToJson("new client", body);
};

const stringToJson = (message, string) => {
  return JSON.stringify({ [message]: string });
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync(`./db/data.json`, dataJSON);
};



const updateUser = (body) => {};


module.exports = { getUser, getAllUsers, addUser, updateUser };
