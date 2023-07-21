const sqlite3 = require("sqlite3");

function exec_query(db_path, query, ...params) {
    let db;
    let data = [];

    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }

            run_query();
        });

        function run_query() {
            db.all(query, ...params, (err, rows) => {
                if (err) {
                    db.close(() => {
                        reject(err);
                    });

                    return;
                }

                data = rows;

                close();
            });
        }

        function close() {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }

                resolve(data);
            });
        }
    });
}

module.exports = {
    exec_query
}
