define(['xaml!sprd/view/svg/SpecialFlexConfigurationRenderer', "sprd/entity/Size"], function(SpecialFlexConfigurationRenderer, Size) {

    return SpecialFlexConfigurationRenderer.inherit("sprd.view.svg.BendingTextConfigurationRendererClass", {

        defaults: {
            tagName: "g",
            componentClass: "bendingText-configuration",
            productViewer: null,
            configurationViewer: null,
            configuration: null,

            textPath: null,
            path : null

        },

        ctor: function() {
            this.callBase();
            this.bind("dom:add", this.recalculateSize, this);

            this.bind("configuration", "recalculateSize", this.recalculateSize, this);
            this.bind("configuration", "change:font", this.loadFont, this);
        },

        render: function() {
            if (this.$stage && this.$stage.$el && this.$stage.$el.parentNode) {
                this.loadFont();
            }

            return this.callBase();
        },

        loadFont: function() {
            var svgRoot = this.getSvgRoot(),
                font = this.get("configuration.font"),
                extension = this.$stage.$browser.isIOS ? "svg#font" : "woff",
                self = this;

            if (!font || !svgRoot) {
                return;
            }

            svgRoot.fontManager.loadExternalFont(font.getUniqueFontName(), this.$.imageService.fontUrl(font, extension), function() {
                self.recalculateSize();
            });
        },

        recalculateSize: function() {
            var textPath = this.$.textPath;
            var path = this.$.path;
            if (textPath && textPath.$el && path && path.$el) {

                var configuration = this.$.configuration;
                if(configuration && configuration.mainConfigurationRenderer && configuration.mainConfigurationRenderer != this ) {
                    return;
                }

                configuration.mainConfigurationRenderer = this;

                var globalToLocalFactor = this.globalToLocalFactor(),
                    textPathRect = textPath.$el.getBBox(),
                    pathRect = path.$el.getBBox();

                var pathBoundingClientRect = path.$el.getBoundingClientRect(),
                    textPathBoundingClientRect = textPath.$el.getBoundingClientRect();

                configuration.set({
                    _size: new Size({
                        width: textPathRect.width,
                        height: textPathRect.height
                    }),
                    textPathOffsetX: (textPathRect.width - pathRect.width) * 0.5,
                    textPathOffsetY: (pathBoundingClientRect.top - textPathBoundingClientRect.top) * globalToLocalFactor.x / configuration.$.scale.x
                });

                configuration.trigger("sizeChanged");
            }
        },

        getPrintColor: function() {
            var configuration = this.$.configuration,
                printColors = configuration.$.printColors,
                printColor = null;

            if(printColors && printColors.size() && !this.isSpecialFlex()) {
                printColor = printColors.at(0).toHexString();
            }

            return printColor;
        }.on(["configuration.printColors", "reset"]).onChange("configuration.printType")

    });
});