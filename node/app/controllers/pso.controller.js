
exports.calculate = (req, res) => {
    console.log( process.env.PATH );
    
    // import child_process module in order to run python script in subprocess
    var spawn = require('child_process').spawn;

    // Create process and pass in args
    const process = spawn('python', ['test.py']);
}