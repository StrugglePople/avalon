import { avalon } from '../seed/core'

export var impDir = avalon.directive('important', {
    priority: 1,
    getScope: function(name, scope) {
        var v = avalon.vmodels[name]
        if (v)
            return v
        throw 'error! no vmodel called ' + name
    },
    diff: function(oldVal, newVal) {
        if (!this.inited)
            oldVal = null
        if (oldVal !== newVal) {
            this.value = newVal
            return true
        }
    },
    update: function(val, vdom, newVdom, afterCb) {
        var vm = newVdom.vm
        afterCb.push(function() {
            var dom = vdom.dom
            vm.$element = dom
            avalon(dom).removeClass('ms-controller')
            var fn = vm.$hooks.onReady
            if (fn) {
                fn({
                    vmodel: vm,
                    target: dom,
                    type: 'ready'
                })
                delete vm.$hooks.onReady
            }

        })

    }
})