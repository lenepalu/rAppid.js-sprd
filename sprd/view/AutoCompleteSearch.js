define(["xaml!js/ui/AutoCompleteBox", "xaml!sprd/data/SprdApiDataSource", "JSON"], function(AutoCompleteBox, SprdApiDataSource, JSON) {

    return AutoCompleteBox.inherit("sprd.view.AutoCompleteSearch", {

        inject: {
            api: SprdApiDataSource
        },

        _search: function(searchTerm, callback) {
            rAppid.ajax("/tag-service/sprd-tags/tags?locale=de_DE&prefix=" + searchTerm +"&simple=true", null, function(err, result) {
                var data = null;
                if (!err) {
                    try {
                        data = JSON.parse(result.responses.text);
                    } catch (e) {
                        err = e;
                    }
                }

                callback && callback(err, data);
            });
        }

    });

});