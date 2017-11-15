let http = require('http');
let Discord = require('discord.js');
let config = require('../config.json');
exports.run = (client) => {
    let gameChannel = client.channels.find("name", config.gameChannel);

    client.user
        .setAvatar("https://res.cloudinary.com/teepublic/image/private/s--W43hugIb--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1478457254/production/designs/784128_1.jpg")
        .setUsername("Rainbow Six Siege Updates");

    http.get('http://steamcommunity.com/games/359550/rss/', (resp) => { //Makes get request to cat api page
        let data = '';
        resp.on('data', (chunk) => { //Writes data chunks to variable as they are recieved
            data += chunk;
        });
        resp.on('end', () => {
            var post = data.split('<item>')[1];
            var titleAr = post.split('<title>');
            var title = titleAr[1].split('</title>')[0];
            var urlAr = post.split('<guid isPermaLink=\"true\">')[1];
            var url = urlAr.split('</guid>')[0];
            var descAr = post.split('<description>')[1];
            var description = descAr.split('</description>')[0];
            if(description.includes('<img')) {
                var image = description.split('\"')[1]
            } else {
                var imgDat = data.split('<image>')[1];
                var imgAr = imgDat.split('<url>')[1];
                var image = imgAr.split('</url>')[0];
            }
            description.replace("<i>", "*");
            description.replace("</i>", "*");
            description.replace("<br>", "\\n");
            descriptionFormat = description.split('<');
            for(i = 0, i < descriptionFormat.length; i++) {
                var formatRemover = descriptionFormat[i].split('>');
                delete formatRemover[0]
                descriptionFormat[i] = formatRemover.join();
            }
            description = descriptionFormat.join();
            const embed = new Discord.RichEmbed()
                .setTitle(title)
                .setDescription(description)
                .setURL(url)
                .setImage(image); //Sets extracted url as image for embed
            gameChannel.send(embed);
        });
    }).on("error", (err) => {
        console.error(err);
    });
    client.user
        .setAvatar("https://i.imgur.com/q0JhzFa.png")
        .setUsername("News Bot");
}