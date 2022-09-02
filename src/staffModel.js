const pool = require('./DBPool');
const { validate } = require('./functions');
const tablename = 'staff';
const requiredfields = ['name', 'lastname', 'email', 'role', 'description', 'image'];

function findAll() {
    return new Promise(async (resolve, _reject) => {
        const query = `select * from ${tablename}`;
        return resolve(pool.query(query));
    });
}

function findOne(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) return reject({message: "Invalid request"});
        const query = `select * from ${tablename} where id=?`;
        const items = await pool.query(query, [id]);
        if (Array.isArray(items) && items.length == 1) return resolve(items[0]);
        return reject(`Error al obtener ${tablename}`);
    });
}

function deleteOne(id) {
    return new Promise(async (resolve, reject) => {
        if (!id || id == '') return reject("Invalid request.");
        const query = `delete from ${tablename} where id=?`;
        resolve(pool.query(query, [id]));
    });
}

function deleteMany(body) {
    return new Promise(async (resolve, reject) => {
        if (!Array.isArray(body) || body.length == 0 || !body.every(i => typeof i === 'string')) return reject("Invalid request");
        const query = `delete from ${tablename} where id IN (?)`;
        resolve(pool.query(query, [body]));
    });
}

function insertOne(body) {
    return new Promise(async (resolve, reject) => {
        const isValid = validate([body], requiredfields);
        if (!isValid) return reject(`Error, revise los campos requeridos de ${tablename}: ${requiredfields.join(', ')}`);
        const query = `INSERT INTO ${tablename} SET ?`;
        resolve(pool.query(query, [body]));
    });
}

function insertMany(body) {
    return new Promise(async (resolve, reject) => {
        if (!Array.isArray(body) || body.length == 0) return reject("Invalid request");
        const isValid = validate(body, requiredfields);
        if (!isValid) return reject(`Error, revise los campos requeridos de ${tablename}: ${requiredfields.join(', ')}`);
        const promises = [];
        body.forEach(i => promises.push(insertOne(i)));
        Promise.all(promises)
            .then(result => resolve(result))
            .catch(e => reject(e));
    });
}

function updateOne(id, body) {
    return new Promise(async (resolve, reject) => {
        if (!id || id == '') return reject("Invalid request");
        const isValid = validate([body], requiredfields);
        if (!isValid) return reject(`Error, revise los campos requeridos de ${tablename}: ${requiredfields.join(', ')}`);
        
        let query = `select * from ${tablename} where id=? limit 1`;
        const olditem = await findOne(id).catch(e => reject(e));
        if (!olditem) return reject(`Error al actualizar ${tablename}`);
        
        let newitem = {};
        for (const [key, value] of Object.entries(olditem)) {
            newitem[key] = body[key] ? body[key] : value;
        }

        query = `update ${tablename} set ? where id=?`;
        resolve(pool.query(query, [newitem, id]));
    });
}

module.exports = {
    findAll,
    findOne,
    deleteOne,
    deleteMany,
    insertOne,
    insertMany,
    updateOne,
}