// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        label: {
            default: null,
            type: cc.Label
        },
        editboxAccount: {
            default: null,
            type: cc.EditBox
        },
        editboxPassword: {
            default: null,
            type: cc.EditBox
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    sendMessageToServer() {
        let request = new XMLHttpRequest();
        const url = 'https://www.arthurslog.com:3210/echo'
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")

        // this.label.string = this.editboxAccount.textLabel.string + '/' + this.editboxPassword.textLabel.string
        this.label.string = 'waiting...'

        var ReadyToSendData = {
            sender: this.editboxAccount.textLabel.string,
            message: this.editboxPassword.textLabel.string
        }

        /*
        // Process and integrate data - Solution 1
        request.onload = function () {
            console.log('Message from server: ');
            console.log(request.response);

            console.log(JSON.parse(request.response).sender);
            console.log(JSON.parse(request.response).message);
            
            // Key section
            // cc.find("Canvas/label").getComponent(cc.Label).string = 
            // JSON.parse(request.response).sender +
            // JSON.parse(request.response).message;
        };
        */

        /*
        // Process and integrate data - Solution 2
        var that = this;
        request.onload = function () {
            console.log('Message from server: ');
            console.log(request.response);

            console.log(JSON.parse(request.response).sender);
            console.log(JSON.parse(request.response).message);
            
            // Key section
            that.label.string = JSON.parse(request.response).sender +
                                JSON.parse(request.response).message;
        };
        */

        // Process and integrate data - Solution 3
        // Key section
        request.onload = () => {
            console.log('Message from server: ');
            console.log(request.response);

            console.log(JSON.parse(request.response).sender);
            console.log(JSON.parse(request.response).message);

            this.label.string = JSON.parse(request.response).sender +
                                JSON.parse(request.response).message;
        }


        // JSON.stringify()
        // console.log(JSON.stringify(ReadyToBeJsonData));
        // JSON.parese()
        // console.log(JSON.parese(JsonData));

        console.log(JSON.stringify(ReadyToSendData));

        request.send(JSON.stringify(ReadyToSendData));
    },

    // update (dt) {},
});
