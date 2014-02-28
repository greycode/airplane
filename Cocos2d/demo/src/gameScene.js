/**
 * Created by Administrator on 14-2-26.
 */

var GameScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        layer.init();
    }
});