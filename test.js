import bcrypt from 'bcrypt';

const hashedpass = bcrypt.hashSync('1234',10)
console.log(hashedpass);
const pass = '123'
const result = bcrypt.compareSync('1234', '$2b$10$u3TXMEuefFod7aqsCfEZFuIr7pq.7zq3arGsc7.CTDTb75UO31mwS')
console.log(result);