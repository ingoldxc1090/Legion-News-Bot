const fs = require("fs");

fs.readdir("./commands", function(err, files) {
    if(err){
        console.error(err);
        return;
    }
    for(i=1; i < files.length; i++) {
        let command = require(`./commands/${files[i]}`);
        try {
            command.run();
        } catch(err){
            console.error(err);
        }
    }
});
timer();
function timer () {
    setTimeout(function () {
        fs.readdir("./commands", function(err, files) {
            if(err){
                console.error(err);
                return;
            }
            for(i=0; i > files.length; i++) {
                let command = require(`./command/${files[i]}`);
                try {
                    command.run(client);
                } catch(err){
                    console.error(err);
                }
            }
        });
        timer()
    }, 300000)
}