/**
 * Created by Administrator on 14-2-26.
 */

var AIRPLANE = 0x10001;
var PlaneLayer = cc.Layer.extend({

    init:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();
        var plane = cc.Sprite.createWithSpriteFrame(
            cc.SpriteFrameCache.getInstance().getSpriteFrame("hero1.png"));
        plane.setPosition(size.width / 2, plane.getContentSize().height / 2);
        this.addChild(plane, 0, AIRPLANE);

        var blink = cc.Blink.create(1, 3);

        var animation =  cc.Animation.create();
        animation.setDelayPerUnit(0.1);
        animation.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("hero1.png"));
        animation.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("hero2.png"));

        var animate = cc.Animate.create(animation);

        plane.runAction(blink);
        plane.runAction(cc.RepeatForever.create(animate));

    }
});
