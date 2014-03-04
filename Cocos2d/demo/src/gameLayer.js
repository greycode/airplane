/**
 * Created by Administrator on 14-2-26.
 */

var GameLayer = cc.Layer.extend({

    background1:null,
    background2:null,

    planeLayer:null,
    bulletLayer:null,
    enemyLayer:null,
    controlLayer:null,

    bgPosY:0,
    bgHeight:0,

    score:0,

    init:function () {
        this._super();

        this.setTouchEnabled(true)
        this.setMouseEnabled(true);
        this.setKeyboardEnabled(true);

        var winSize = cc.Director.getInstance().getWinSize();

        this.background1 = cc.Sprite.createWithSpriteFrame(
            cc.SpriteFrameCache.getInstance().getSpriteFrame("background.png"));
        this.background1.setAnchorPoint(0, 0);
        this.addChild(this.background1);

        this.background2 = cc.Sprite.createWithSpriteFrame(
            cc.SpriteFrameCache.getInstance().getSpriteFrame("background.png"));
        this.background2.setAnchorPoint(0, 0);
        this.addChild(this.background2);

        this.bgHeight = this.background1.getContentSize().height;
        this.updateBgPosition();

        this.planeLayer = new PlaneLayer();
        this.planeLayer.init();
        this.addChild(this.planeLayer);

        this.bulletLayer = new BulletLayer();
        this.bulletLayer.init();
        this.bulletLayer.startShoot();
        this.addChild( this.bulletLayer);

        this.enemyLayer = new EnemyLayer();
        this. enemyLayer.init();
        this.addChild(this.enemyLayer);

        this.controlLayer = new ControlLayer();
        this.controlLayer.init();
        this.addChild(this.controlLayer);

        this.schedule(function () {
            this.bgPosY -= 2;
            if (this.background2.getPositionY() <= 0) {
                this.bgPosY = 0;
            }
            this.updateBgPosition();
        }, 0.02);

        this.scheduleUpdate();
    },

    updateBgPosition: function () {
        this.background1.setPositionY(this.bgPosY);
        this.background2.setPositionY(this.bgPosY + this.bgHeight - 2);
    },

    update:function () {
        var bullets = this.bulletLayer.allBullets;
        var enemyAs = this.enemyLayer.allEnemyA;
        var enemyBs = this.enemyLayer.allEnemyB;

        var bulletToDelete = [], enemyAToDelete = [], enemyBToDelete = [];
        for (var i = 0;i < bullets.length; i++) {
            for (var j = 0;j < enemyAs.length; j++) {
                if (cc.rectIntersectsRect(bullets[i].getBoundingBox(), enemyAs[j].getBoundingBox())) {
                    if ( --enemyAs[j].attr.life <= 0 ) {
                        enemyAToDelete.push( enemyAs[j]);
                        this.score += enemyAs[j].attr.score;
                    }
                    bulletToDelete.push(bullets[i]);
                }
            }

            for (var j = 0;j < enemyBs.length; j++) {
                if (cc.rectIntersectsRect(bullets[i].getBoundingBox(), enemyBs[j].getBoundingBox())) {
                    if (--enemyBs[j].attr.life <= 0) {
                        enemyBToDelete.push( enemyBs[j]);
                        this.score += enemyBs[j].attr.score;
                    }
                    bulletToDelete.push(bullets[i]);
                }
            }
        }

        if (this.planeLayer.isAlive) {
            for (var j = 0;j < enemyAs.length; j++) {
                if (cc.rectIntersectsRect(
                    this.planeLayer.getChildByTag(AIRPLANE).getBoundingBox(),
                    enemyAs[j].getBoundingBox())) {
                    cc.log("plane life:" + this.planeLayer.getChildByTag(AIRPLANE).attr.life)
                    if (--this.planeLayer.getChildByTag(AIRPLANE).attr.life <= 0) {
                        this.bulletLayer.stopShoot();
                        //this.enemyLayer.clearAllEnemy();
                        this.planeLayer.blowUp();
                    }
                    enemyAToDelete.push( enemyAs[j]);
                }
            }

            for (var j = 0;j < enemyBs.length; j++) {
                if (cc.rectIntersectsRect(
                    this.planeLayer.getChildByTag(AIRPLANE).getBoundingBox(),
                    enemyBs[j].getBoundingBox())) {
                    this.bulletLayer.stopShoot();
                    //this.enemyLayer.clearAllEnemy();
                    this.planeLayer.blowUp();

                    enemyBToDelete.push( enemyBs[j]);
                }
            }
        }

        for (var i = 0;i < enemyAToDelete.length; i++) {
            this.enemyLayer.enemyABlowUp(enemyAToDelete[i]);
        }
        for (var i = 0;i < enemyBToDelete.length; i++) {
            this.enemyLayer.enemyBBlowUp(enemyBToDelete[i]);
        }

        for (var i = 0;i < bulletToDelete.length; i++) {
            this.bulletLayer.removeBullet(bulletToDelete[i]);
        }

        this.controlLayer.updateScore(this.score);

    },

    onKeyDown:function (code) {
        if (cc.KEY.space == code ) {
            this.controlLayer.menuPauseCallback(this.controlLayer);
        }
    },
    onMouseEntered:function (event) {

        if (!cc.Director.getInstance().isPaused() && this.planeLayer.isAlive)
            this.planeLayer.getChildByTag(AIRPLANE).setPosition(event.getLocation());
        return true;

    },
    onMouseMoved:function (event) {
        if (!cc.Director.getInstance().isPaused() && this.planeLayer.isAlive)
            this.planeLayer.getChildByTag(AIRPLANE).setPosition(event.getLocation())
        return true;
    },
    onMouseDragged:function (event) {
       return this.onMouseMoved(event);
    },
    onOtherMouseDragged:function (event) {
        return this.onMouseMoved(event);
    },
    onMouseDown:function (event) {
        //cc.log(event.getLocation().x + ':' + event.getLocation().y);
    },

    EOF:function () { }
});