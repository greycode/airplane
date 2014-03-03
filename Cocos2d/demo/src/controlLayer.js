/**
 * Created by Administrator on 14-3-3.
 */
var ControlLayer = cc.Layer.extend({

    pauseItem:null,
    scoreItem:null,

    init:function () {
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();

        var norPause = cc.Sprite.createWithSpriteFrameName("game_pause_nor.png");
        var pressPause = cc.Sprite.createWithSpriteFrameName("game_pause_pressed.png");

        this.pauseItem = cc.MenuItemSprite.create(norPause, pressPause, null, null, this);
        //pauseItem.initWithNormalSprite();
        this.pauseItem.setPosition(cc.p(norPause.getContentSize().width/2 + 10,
            winSize.height - norPause.getContentSize().height/2 - 10));
        var menuPause = cc.Menu.create(this.pauseItem);
        menuPause.setPosition(cc.p(0, 0));
        this.addChild(menuPause, 101);


        this.scoreItem = cc.LabelBMFont.create("0","font/font.fnt");
        this.scoreItem.setColor(cc.c3(143, 146, 147));
        this.scoreItem.setAnchorPoint(cc.p(0, 0.5));
        this.scoreItem.setPosition(cc.p(this.pauseItem.getPositionX() +
            norPause.getContentSize().width / 2 + 10, this.pauseItem.getPositionY()));
        this.addChild(this.scoreItem);

//        if (!sys.localStorage["isHaveSaveDate"]) {
//            sys.localStorage.setItem("isHaveSaveDate",true);
//            sys.localStorage.setItem("highScore",12000)
//        } else {
//            var hiScore = sys.localStorage["highScore"]
//            var hiScoreItem = cc.LabelBMFont.create( hiScore,"font/font.fnt");
//            hiScoreItem.setColor(cc.c3(143, 146, 147));
//            hiScoreItem.setAnchorPoint(cc.p(0, 0.5));
//            hiScoreItem.setPosition(cc.p(this.scoreItem.getPositionX() +
//                norPause.getContentSize().width / 2 + 10, this.pauseItem.getPositionY()));
//            this.addChild(hiScoreItem);
//        }

    },
    menuPauseCallback: function (obj) {
        var director = cc.Director.getInstance();

        if (!director.isPaused()) {
            this.pauseItem.setNormalImage(cc.Sprite.createWithSpriteFrameName("game_resume_nor.png"));
            this.pauseItem.setSelectedImage(cc.Sprite.createWithSpriteFrameName("game_resume_pressed.png"));
            director.pause();
        } else {
            this.pauseItem.setNormalImage(cc.Sprite.createWithSpriteFrameName("game_pause_nor.png"));
            this.pauseItem.setSelectedImage(cc.Sprite.createWithSpriteFrameName("game_pause_pressed.png"));
            director.resume();
        }
    },

    EOF:function () { }
});