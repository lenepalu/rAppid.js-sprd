define(['sprd/data/SprdModel'], function (SprdModel) {
    return SprdModel.inherit('sprd.model.ObjectType', {
        schema: {
            name: String
        }
    });
});