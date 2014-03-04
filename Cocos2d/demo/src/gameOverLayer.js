/**
 * Created by Administrator on 14-3-4.
 */
var GameOverLayer = cc.Layer.extend({

    scoreItem:null,
    hiScoreItem:null,
    backItem:null,

    init:function (score, hiScore) {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        var backgroud = cc.Sprite.createWithSpriteFrameName("gameover.png");
        backgroud.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(backgroud);

        var norBack = cc.Sprite.createWithSpriteFrameName("btn_finish.png");
        var pressBack = cc.Sprite.createWithSpriteFrameName("btn_finish.png");

        this.backItem = cc.MenuItemSprite.create(norBack, pressBack, null, this.backToGame, this);
        //pauseItem.initWithNormalSprite();
        this.backItem.setPosition(cc.p(winSize.width - norBack.getContentSize().width/2 - 10,
            norBack.getContentSize().height/2 + 10));
        var menuBack = cc.Menu.create(this.backItem);
        menuBack.setPosition(cc.p(0, 0));
        this.addChild(menuBack);

        this.scoreItem = cc.LabelBMFont.create(score, "font/font.fnt");
        this.scoreItem.setColor(cc.c3(143, 146, 147));
        this.scoreItem.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(this.scoreItem);


        this.hiScoreItem = cc.LabelBMFont.create(hiScore, "font/font.fnt");
        this.hiScoreItem.setColor(cc.c3(143, 146, 147));
        this.hiScoreItem.setAnchorPoint(cc.p(0,0.5));
        this.hiScoreItem.setPosition(cc.p(150, winSize.height - 53));
        this.addChild(this.hiScoreItem);

        var delay = cc.DelayTime.create(0.5);
        var scaleOut = cc.ScaleBy.create(0.5,2);
        var scaleIn = cc.ScaleBy.create(0.5,0.75);
        var actSeq = cc.Sequence.create(delay, scaleOut, scaleIn);
        this.scoreItem.runAction(actSeq);

        if (score > hiScore) {
            sys.localStorage.setItem("highScore", score);
            var delay = cc.DelayTime.create(1.3);
            var moveOut = cc.MoveBy.create(0.1,cc.p(0, 100))
            var changeScore = cc.CallFunc.create( function (caller, data) {
                this.hiScoreItem.setString(data)
            }, this, score);
            var moveIn = cc.MoveBy.create(0.1,cc.p(0, -100))

            var actSeq = cc.Sequence.create(delay, moveOut, changeScore,moveIn);
            this.hiScoreItem.runAction(actSeq);
        }

    },
    backToGame:function () {
        var gameScene = new GameScene();
        gameScene.init();
        var tras = cc.TransitionCrossFade.create(0.8, gameScene);
        cc.Director.getInstance().replaceScene(tras);
    },

    EOF:function () { }
});