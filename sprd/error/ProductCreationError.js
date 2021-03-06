define(["js/core/Error"], function (Error) {

    var errorTests,
        ProductCreationError = Error.inherit('sprd.error.ProductCreationError', {
        }, {
            createFromResponse: function (err) {

                if (!err) {
                    return null;
                }

                if (err.xhr && err.xhr.responses) {
                    var message = err.xhr.responses.text;

                    for (var i = 0; i < errorTests.length; i++) {
                        var errorTest = errorTests[i];
                        if (errorTest.test.test(message)) {
                            return new ProductCreationError(errorTest.type,
                                ProductCreationError.ErrorCodes[errorTest.type] || ProductCreationError.ErrorCodes.PRODUCT_CREATION,
                                err);
                        }
                    }
                }
                return new ProductCreationError("ProductCreationError", ProductCreationError.ErrorCodes.PRODUCT_CREATION);
            }

        });

    ProductCreationError.ErrorCodes = {
        PRODUCT_CREATION: -100,
        HARD_BOUNDARY: -101,
        CONFIGURATION_OVERLAP: -102,
        MAX_BOUND: -103,
        MIN_BOUND: -104,
        COPYRIGHT: -105
    };

    errorTests = [
        {
            test: /smaller\sthan/,
            type: "MIN_BOUND"
        },
        {
            test: /HARD\sBOUNDARY/,
            type: "HARD_BOUNDARY"
        },
        {
            test: /is\sto\sbig\sfor\sprinttype/,
            type: "MAX_BOUND"
        },
        {
            test: /blacklisted\sterm/,
            type: "COPYRIGHT"
        }
    ];

    return ProductCreationError;
});