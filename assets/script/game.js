
cc.Class({
    extends: cc.Component,

    properties: {
      tiledMap: cc.TiledMap,
      dialogNode: cc.Node
    },

    onLoad () {
        let p = cc.director.getPhysicsManager()
        p.enabled = true
        // p.debugDrawFlags = true
        p.gravity = cc.v2(0, 0) // 取消重力 
    },

    start () {
        let tiledSize = this.tiledMap.getTileSize() // 拿到每一块的尺寸
        let layer = this.tiledMap.getLayer('wall')
        let layerSize = layer.getLayerSize() // 获取尺寸

        for(let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true)
                // tiled.gdid = 0 则拿不到
                if (tiled.gid != 0) {
                    tiled.node.group = 'wall'
                    let body = tiled.node.addComponent(cc.RigidBody)
                    body.type = cc.RigidBodyType.Static
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider)
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
                    collider.size = tiledSize
                    collider.apply()
                }
            }
        }

        // this.dialog = this.dialogNode.getComponent('dialog')
        // this.dialog.init([
        //     { role: 2, content: '我是魔王' },
        //     { role: 1, content: '大家好，我是勇者' },
        // ])
    },
});
