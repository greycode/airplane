/**
 * Created by Administrator on 14-2-27.
 */
var BulletLayer = cc.Layer.extend({

    bulletFactor:0.5,
    bulletBatchNode:null,
    allBullets:[],

    init:function () {
        this._super();

        var texture = cc.TextureCache.getInstance().textureForKey("shoot.png");
//        var texture = cc.TextureCache.getInstance().addImage("cat_3.png");
        this.bulletBatchNode = cc.SpriteBatchNode.createWithTexture(texture);
        this.addChild(this.bulletBatchNode);

    },
    startShoot:function (delay) {
        this.schedule(this.addBullet, 0.25 * this.bulletFactor, cc.REPEAT_FOREVER, delay);
    },
    stopShoot:function () {
        this.unschedule(this.addBullet);
    },
    addBullet:function () {
        var bullet = cc.Sprite.createWithSpriteFrameName("bullet1.png");
//        var bullet = cc.Sprite.create("cat_3.png");
        this.bulletBatchNode.addChild(bullet);
        this.allBullets.push(bullet);

        var airPlane = this.getParent().planeLayer.getChildByTag(AIRPLANE);

        //bullet.setScale(airPlane.getContentSize().height/bullet.getContentSize().height)

        var bulletPosition = new cc.Point(airPlane.getPositionX(),
            airPlane.getPositionY() + airPlane.getContentSize().height / 2);
        bullet.setPosition(bulletPosition);

        var length = cc.Director.getInstance().getWinSize().height + bullet.getContentSize().height / 2 -
            bullet.getPositionY();
        var realMoveDuration = length / (320 / 1);

        var actionMove = cc.MoveTo.create(realMoveDuration,
            cc.p(bullet.getPositionX(),
                cc.Director.getInstance().getWinSize().height + bullet.getContentSize().height / 2));
        var actionDone = cc.CallFunc.create(this.bulletMoveDone, this, bullet);

        var seqAction = cc.Sequence.create(actionMove, actionDone);

        bullet.runAction(seqAction);

    },
    bulletMoveDone:function (bullet) {
        //cc.log(bullet)
        cc.ArrayRemoveObject(this.allBullets, bullet);
        this.bulletBatchNode.removeChild(bullet, true);

    },
    removeBullet:function (bullet) {
      this.bulletMoveDone(bullet);
    },


    EOF:function () { }
});