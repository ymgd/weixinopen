// 记录事件的定义
module.exports = {
    firstDay: {
        type: "first-day" 
    },
    notOneKilled: {
        type: "not-one-killed"
    },
    vote: {
        type: "vote",
        people: [],
        target: {
            name: ""
        }
    },
    execute: {
        type: "execute",
        player: {
            name: ""
        }
    },
    dead: {
        type: "dead",
        player: {
            name: ""
        }
    },
    hunter: {
        type: "hunter",
        player: {
            name: ""
        },
        target: {
            name: ""
        }
    },
    lover: {
        type: "lover",
        player0: {
            name: ""
        },
        player1: {
            name: ""
        }
    }
}