/**
 * Created by Administrator on 14-2-28.
 */
var EnemyLayer = cc.Layer.extend({

    allEnemyA:[],
    allEnemyB:[],

    init:function () {
        this._super();

        var enemyADown = cc.Animation.create();
        enemyADown.setDelayPerUnit(0.1);
        enemyADown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy1_down1.png"));
        enemyADown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy1_down2.png"));
        enemyADown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy1_down3.png"));
        enemyADown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy1_down4.png"));

        var enemyBDown = cc.Animation.create();
        enemyBDown.setDelayPerUnit(0.1);
        enemyBDown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy2_down1.png"));
        enemyBDown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy2_down2.png"));
        enemyBDown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy2_down3.png"));
        enemyBDown.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("enemy2_down4.png"));

        cc.AnimationCache.getInstance().addAnimation(enemyADown, 'enemyABlowUp');
        cc.AnimationCache.getInstance().addAnimation(enemyBDown, 'enemyBBlowUp');

        this.schedule(this.addEnemyA, 0.5);
        this.schedule(this.addEnemyB, 3.0);
    },
    addEnemyA:function () {
        var enemy = cc.Sprite.createWithSpriteFrameName("enemy1.png");

        var winSize = cc.Director.getInstance().getWinSize();
        var enemySize = enemy.getContentSize();
        var randomX = getRandomInt(enemySize.width / 2, winSize.width - enemySize.width / 2);
        enemy.setPosition(randomX, winSize.height + enemySize.height / 2);

        this.addChild(enemy);
        this.allEnemyA.push(enemy);

        var actDuration = getRandomNum(2.0, 4);
        var actMoveTo = cc.MoveTo.create(actDuration,cc.p(randomX, - enemySize.height / 2));
        var actMoveDone = cc.CallFunc.create(function (data) {
            this.removeChild(data);
        }, this, enemy);

        var actSeq = cc.Sequence.create(actMoveTo, actMoveDone);

        enemy.runAction(actSeq);
    },
    addEnemyB:function () {
        var enemy = cc.Sprite.createWithSpriteFrameName("enemy2.png");

        var winSize = cc.Director.getInstance().getWinSize();
        var enemySize = enemy.getContentSize();
        var randomX = getRandomInt(enemySize.width / 2, winSize.width - enemySize.width / 2);
        enemy.setPosition(randomX, winSize.height + enemySize.height / 2);

        this.addChild(enemy);
        this.allEnemyB.push(enemy);

        var actDuration = getRandomNum(3.0, 6);
        var actMoveTo = cc.MoveTo.create(actDuration,cc.p(randomX, - enemySize.height / 2));
        var actMoveDone = cc.CallFunc.create(function (data) {
            this.removeChild(data);
        }, this, enemy);

        var actSeq = cc.Sequence.create(actMoveTo, actMoveDone);

        enemy.runAction(actSeq);
    },
    enemyABlowUp: function (enemy) {
        var animation = cc.AnimationCache.getInstance().getAnimation("enemyABlowUp");
        var animate = cc.Animate.create(animation);
        var animationDone = cc.CallFunc.create(function (obj) {
            cc.ArrayRemoveObject(this.allEnemyA, obj);
            this.removeChild(obj);
        },this, enemy);

        var actSeq = cc.Sequence.create(animate, animationDone);
        enemy.runAction(actSeq);
    },
    enemyBBlowUp: function (enemy) {
        var animation = cc.AnimationCache.getInstance().getAnimation("enemyBBlowUp");
        var animate = cc.Animate.create(animation);
        var animationDone = cc.CallFunc.create(function (obj) {
            cc.ArrayRemoveObject(this.allEnemyB, obj);
            this.removeChild(obj);
        },this, enemy);

        var actSeq = cc.Sequence.create(animate, animationDone);
        enemy.runAction(actSeq);
    },

    EOF:function( ){ }
});