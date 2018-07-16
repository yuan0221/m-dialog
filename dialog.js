;
(function ($) {
    var Dialog = function (config) {
        var _this = this;

        this.config = {
            width: 'auto',
            height: 'auto',
            message: null,
            type: 'waiting',
            button: null,
            delay: null,
            maskOpacity: null,
            effect: null
        }
        // 参数扩展
        if (config && $.isPlainObject(config)) {
            $.extend(this.config, config);
        } else {
            this.isConfig = true;
        }

        console.log(this.config);

        // 创建dom
        this.body = $('body');
        this.mask = $('<div class="g-dialog-container">');
        this.win = $('<div class="dialog-window">');
        this.winHeader = $('<div class="dialog-header">');
        this.winContent = $('<div class="dialog-content">');
        this.winFooter = $('<div class="dialog-footer">');

        this.render();



    };

    Dialog.zIndex = 10000;

    Dialog.prototype = {
        animate: function () {
            var _this = this;
            this.win.css('-webkit-transform', 'scale(0,0)');

            setTimeout(function(){
                _this.win.css('-webkit-transform', 'scale(1,1)');
            },100);
            
        },
        render: function () {
            var _this_ = this,
                config = this.config,
                mask = this.mask,
                win = this.win,
                header = this.winHeader,
                content = this.winContent,
                footer = this.winFooter,
                body = this.body;

                Dialog.zIndex++;
                this.mask.css('zIndex', Dialog.zIndex);
            // 不传参弹出loading
            if (this.isConfig) {
                win.append(header.addClass('waiting'));

                if(config.effect){
                    this.animate();
                }

                mask.append(win);
                body.append(mask);
            } else {
                // 传参数
                header.addClass(config.type);
                win.append(header);
                if (config.message) {
                    win.append(content.html(config.message));
                };

                if (config.button) {
                    this.creatButtons(footer, config.button);
                    win.append(footer);
                }
                mask.append(win);
                body.append(mask);


                if (config.width != 'auto') {
                    win.width(config.width);
                };
                if (config.height != 'auto') {
                    win.height(config.height);
                };
                if (config.maskOpacity) {
                    mask.css('backgroundColor', 'rgba(0,0,0,' + config.maskOpacity + ')');
                };
                if (config.delay && config.delay != 0) {
                    window.setTimeout(function () {
                        _this_.close();
                    }, config.delay);
                };
                if(config.effect){
                    this.animate();
                }
            }
        },


        creatButtons: function (footer, button) {
            var _this_ = this;

            $(button).each(function (i) {
                var type = this.type ? " class='" + this.type + "'" : "";
                var btnText = this.text ? this.text : "按钮" + (++i);
                var callback = this.callback ? this.callback : null;
                var button = $("<button" + type + ">" + btnText + "</button>");
                if (callback) {

                    button.on('touchstart', function () {
                        var isclose = callback();

                        if (isclose != false) {
                            _this_.close();
                        };

                    });

                } else {

                    button.on('touchstart', function () {

                        _this_.close();

                    })


                }
                footer.append(button);

            });

        },

        close: function () {
            this.mask.remove();
        }



    };

    window.Dialog = Dialog;
    // 绑定到jQuery上
    $.dialog = function (config) {
        return new Dialog(config);
    }





})(Zepto);