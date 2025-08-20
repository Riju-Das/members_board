const pool = require("./pool")

async function fetchMessages(){
  const {rows} = await pool.query(`SELECT * FROM messages ORDER BY id ASC`)
  return rows
}
async function fetchUsers(){
  const {rows} = await pool.query(`SELECT * FROM users`)
  return rows
}

async function fetchUser(id) {
  const {rows} = await pool.query(`SELECT * FROM users WHERE id=$1`,[id])
  return rows[0] 
}

async function findUsername(username) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username=$1`, [username])
  return rows[0];
}

async function SignUpinDB(username,password,email,fullname) {
  await pool.query(`INSERT INTO users(username,password,email,fullname) VALUES ($1, $2,$3,$4)`,[username,password, email,fullname])
}

async function postNewMessage(user_id , title, message) {
  await pool.query('INSERT INTO messages(title,message,user_id) VALUES($1,$2,$3)',[title,message,user_id])
}

async function getMessage(id){
  const {rows} = await pool.query(`SELECT * FROM messages WHERE id=$1`,[id]);
  return rows[0];
}

async function UpdateMessage(msg_id,user_id,title,message) {
  await pool.query(
    `UPDATE messages SET title = $1, message = $2 WHERE id = $3 AND user_id = $4`,[title, message, msg_id, user_id]
  ); 
}

async function userIdFromMsg(msg_id) {
  const {rows}=await pool.query("SELECT * FROM messages WHERE id=$1", [msg_id]) 
  return rows[0].user_id
}

async function DeleteMessage(msg_id){
  await pool.query('DELETE FROM messages WHERE id=$1',[msg_id])
}

module.exports= {
  fetchMessages,
  fetchUsers,
  findUsername,
  fetchUser,
  SignUpinDB,
  postNewMessage,
  getMessage,
  UpdateMessage,
  userIdFromMsg,
  DeleteMessage
}