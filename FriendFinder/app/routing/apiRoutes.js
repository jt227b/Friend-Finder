var friendData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        }

        var newFriend = req.body
        var newFriendScores = newFriend.scores
        var totalDifference = 0

        for (i = 0; i < friendData.length; i++){
            totalDifference = 0
            for (var j=0; j< friendData[i].scores[j]; j++){
                totalDifference += Math.abs(parseInt(newFriendScores[j]) - parseInt(friendData[i].scores[j]));
                if (totalDifference <= bestMatch.friendDifference){
					bestMatch.name = friendData[i].name;
                    bestMatch.photo = friendData[i].photo;
                    bestMatch.friendDifference = totalDifference;
				}
            }
        }

        friendData.push(newFriend);
        res.json(bestMatch)
    });
}