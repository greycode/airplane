/**
 * Created by Administrator on 14-3-4.
 */
var GameOverScene = cc.Scene.extend({

    score:0,
    hiScore:0,

    onEnter:function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
        layer.init(this.score, this.hiScore);
    },

    setScore:function (score, hiscore) {
        this.score = score;
        this.hiScore = hiscore;
    }
});