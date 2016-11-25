var util = require("../utils/util.js");
var history = require("history.js");

var firstDay = history.firstDay;
var dead = history.dead;
var vote = history.vote;
var execute = history.execute;
var hunter = history.hunter;
var notOneKilled = history.notOneKilled;
var lover = history.lover;

module.exports = {
    history: [
        {
            time: "day",
            events: [
                util.clone(firstDay)
            ]
        },
        {
            time: "night",
            events: [
                util.clone(dead, function(o) {
                    o.player.name = "玩家1";
                })
            ]
        },
        {
            time: "day",
            events: [
                util.clone(vote, function(o) {
                    o.people = ["玩家A", "玩家B"];
                    o.target.name = "玩家3";
                }),
                util.clone(vote, function(o) {
                    o.people = ["玩家C", "玩家D", "玩家E", "玩家F"];
                    o.target.name = "玩家2";
                }),
                util.clone(execute, function(o) {
                    o.player.name = "玩家2";
                })
            ]
        },
        {
            time: "night",
            events: [
                util.clone(dead, function(o) {
                    o.player.name = "玩家3";
                }),
                util.clone(dead, function(o) {
                    o.player.name = "玩家4";
                })
            ]
        },
        {
            time: "day",
            events: [
                util.clone(hunter, function(o) {
                    o.player.name = "玩家6";
                    o.target.name = "玩家C";
                })
            ]
        },
        {
            time: "night",
            events: [
                util.clone(notOneKilled)
            ]
        },
        {
            time: "day",
            events: [
                util.clone(lover, function(o) {
                    o.player0.name = "玩家8";
                    o.player1.name = "玩家7";
                })
            ]
        }
    ]
}