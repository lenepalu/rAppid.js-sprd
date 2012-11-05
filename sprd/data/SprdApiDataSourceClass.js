define(["js/data/RestDataSource", "underscore", "sprd/data/SprdModel", "sprd/model/processor/DefaultProcessor", "sprd/model/processor/BasketProcessor", "sprd/model/processor/BasketItemProcessor"],
    function (RestDataSource, _, SprdModel, DefaultProcessor, BasketProcessor, BasketItemProcessor) {

        var SprdApiDataSource = RestDataSource.inherit('sprd.data.SprdApiDataSource', {

            defaults: {
                locale: "en_EU",
                parsePayloadOnCreate: false,
                parsePayloadOnUpdate: false
            },

            $defaultProcessorFactory: DefaultProcessor,

            $processors: {
                BasketProcessor: BasketProcessor,
                BasketItemProcessor: BasketItemProcessor
            },

            getQueryParameter: function (action) {
                var params = _.defaults({
                    mediaType: "json",
                    locale: this.$.locale
                }, this.callBase(action));

                if (this.$.apiKey) {
                    params = _.defaults(params, {
                        apiKey: this.$.apiKey
                    });
                }

                return params;
            },

            createContext: function (properties, parentContext) {

                if (properties) {
                    if (properties.shopId) {
                        return new SprdApiDataSource.ShopContext(this, properties, parentContext);
                    }

                    if (properties.userId) {
                        return new SprdApiDataSource.UserContext(this, properties, parentContext);
                    }

                    if (properties.basketId) {
                        return new SprdApiDataSource.BasketContext(this, properties, parentContext);
                    }
                }
                return new SprdApiDataSource.SprdApiContext(this, properties, parentContext);
            },

            /***
             * returns the context for the shop
             *
             * @param {String} [shopId]
             * @param [locale]
             * @return {RestDataSource.Context}
             */
            shop: function (shopId, locale) {

                shopId = shopId || this.$.shopId;
                locale = locale || this.$.locale;

                var properties = {
                    shopId: shopId
                };

                if (locale) {
                    properties.locale = locale;
                }

                return this.getContext(properties);
            },

            /***
             *
             * returns the context for the user
             *
             * @param [userId]
             * @param [locale]
             * @return {RestDataSource.Context}
             */
            user: function (userId, locale) {
                userId = userId || this.$.shopId;
                locale = locale || this.$.locale;


                var properties = {
                    userId: userId
                };

                if (locale) {
                    properties.locale = locale;
                }

                return this.getContext(properties);
            }

        });

        SprdApiDataSource.SprdApiContext = RestDataSource.RestContext.inherit({
            getQueryParameter: function () {

                var parameter = {
                    mediaType: "json"
                };

                if (this.$properties && this.$properties.locale) {
                    parameter.locale = this.$properties.locale;
                }

                return _.defaults(parameter, this.callBase());
            }
        });

        SprdApiDataSource.ShopContext = SprdApiDataSource.SprdApiContext.inherit("sprd.data.SprdApiDataSource.ShopContext", {
            getPathComponents: function () {
                return ['shops', this.$properties.shopId];
            }
        });

        SprdApiDataSource.UserContext = SprdApiDataSource.SprdApiContext.inherit("sprd.data.SprdApiDataSource.UserContext", {
            getPathComponents: function () {
                return ['users', this.$properties.userId];
            }
        });

        SprdApiDataSource.BasketContext = SprdApiDataSource.SprdApiContext.inherit("sprd.data.SprdApiDataSource.BasketContext", {
            getPathComponents: function () {
                return ['baskets', this.$properties.basketId];
            }
        });

        return SprdApiDataSource;
    });