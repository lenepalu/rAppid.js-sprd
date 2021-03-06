define(["sprd/model/VectorMask", "sprd/model/PixelMask", "underscore"], function(VectorMask, PixelMask, _) {
    return function(baseUrl) {
        var masks = [
            new VectorMask({
                name: "Heart",
                src: baseUrl("sprd/img/masks/heart.svg"),
                id: 12,
                fixedAspectRatio: true
            }),
            new VectorMask({
                name: "Circle",
                src: baseUrl("sprd/img/masks/circle_black.svg"),
                id: 8,
                fixedAspectRatio: false
            }),
            // new VectorMask({
            //     name: "Ellipse",
            //     src: baseUrl("sprd/img/masks/ellipse_black.svg"),
            //     id: 9,
            //     fixedAspectRatio: false
            // }),
            new VectorMask({
                name: "Triangle",
                src: baseUrl("sprd/img/masks/triangle_rounded_black.svg"),
                id: 3,
                fixedAspectRatio: false
            }),
            new VectorMask({
                name: "Trapezium",
                src: baseUrl("sprd/img/masks/trapezium_black.svg"),
                id: 7,
                fixedAspectRatio: false
            }),
            // new VectorMask({
            //     name: "S",
            //     src: baseUrl("sprd/img/masks/SlikeSusi_black.svg"),
            //     id: 9,
            //     fixedAspectRatio: false
            // }),
            new VectorMask({
                name: "A",
                src: baseUrl("sprd/img/masks/AlikeAnton_black.svg"),
                id: 13,
                fixedAspectRatio: false
            }),
            new VectorMask({
                name: "Star",
                src: baseUrl("sprd/img/masks/starrounded_black.svg"),
                id: 10,
                fixedAspectRatio: false
            }),
            new VectorMask({
                name: "Karo",
                src: baseUrl("sprd/img/masks/karo_black.svg"),
                id: 6,
                fixedAspectRatio: false
            }),
            new VectorMask({
                name: "Complicated",
                src: baseUrl("sprd/img/masks/its_complicated_black.svg"),
                id: 14,
                fixedAspectRatio: false
            }),
            new VectorMask({
                name: "Polygon",
                src: baseUrl("sprd/img/masks/polygon_black.svg"),
                id: 5,
                fixedAspectRatio: false
            }),
            new VectorMask({
                name: "Square",
                src: baseUrl("sprd/img/masks/roundedsquare_black.svg"),
                id: 1,
                fixedAspectRatio: false
            }),
            new VectorMask({
                name: "Rounded",
                src: baseUrl("sprd/img/masks/rounded_black.svg"),
                id: 11,
                fixedAspectRatio: false
            }),
            new PixelMask({
                name: "Kreuz",
                image: baseUrl("sprd/img/masks/grosses-kreuz.png"),
                preview: baseUrl("sprd/img/masks/previews/cross.png"),
                id: 15
            }),
            new PixelMask({
                name: "Rand",
                image: baseUrl("sprd/img/masks/Rand.png"),
                preview: baseUrl("sprd/img/masks/previews/marker01.png"),
                id: 17
            }),
            new PixelMask({
                name: "Gekratzt",
                image: baseUrl("sprd/img/masks/gekratzt.png"),
                preview: baseUrl("sprd/img/masks/previews/sponge_02.png"),
                id: 24
            }),
            new PixelMask({
                name: "Pinsel",
                image: baseUrl("sprd/img/masks/harter-Pinsel.png"),
                preview: baseUrl("sprd/img/masks/previews/brush_02.png"),
                id: 18
            }),
            new PixelMask({
                name: "Getupft",
                image: baseUrl("sprd/img/masks/Rand-getupft.png"),
                preview: baseUrl("sprd/img/masks/previews/sponge_01.png"),
                id: 28
            }),
            new PixelMask({
                name: "Schmetterlinge",
                image: baseUrl("sprd/img/masks/schmetterlinge.png"),
                preview: baseUrl("sprd/img/masks/previews/butterfly_01.png"),
                id: 25
            }),
            // new PixelMask({
            //     name: "Schmetterlinge #2",
            //     image: baseUrl("sprd/img/masks/schmetterlinge-gor.png"),
            //     preview: baseUrl("sprd/img/masks/previews/butterfly_02.png"),
            //     id: 26
            // }),
            // new PixelMask({
            //     name: "Schwamm",
            //     image: baseUrl("sprd/img/masks/schwamm.png"),
            //     id: 23
            // }),
            new PixelMask({
                name: "Stifte",
                image: baseUrl("sprd/img/masks/stifte.png"),
                preview: baseUrl("sprd/img/masks/previews/pencil_02.png"),
                id: 22
            }),
            new PixelMask({
                name: "Wachsmalkreide",
                image: baseUrl("sprd/img/masks/wachsmalkreide-_Kreide-36_.png"),
                preview: baseUrl("sprd/img/masks/previews/pencil_01.png"),
                id: 23
            }),
            new PixelMask({
                name: "Wasser",
                image: baseUrl("sprd/img/masks/wasserfarbe.png"),
                preview: baseUrl("sprd/img/masks/previews/brush_01.png"),
                id: 19
            }),
            new PixelMask({
                name: "Winter",
                image: baseUrl("sprd/img/masks/winteriscoming.png"),
                preview: baseUrl("sprd/img/masks/previews/winter.png"),
                id: 27
            })
        ];

        masks.nullMaskSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAChUlEQVR4Xu3ayU3DYBRF4WcqCw0wrIME6QQqIYhhDxQAJUAnbBmNLAhEGSDEb3EeOlmTX9f340Z2lCZ8oRpoUGkME4LA/gkEEQTWACyOCxEE1gAsjgsRBNYALI4LEQTWACyOCxEE1gAsjgsRBNYALI4LEQTWACyOCxEE1gAsjgsRBNYALI4LEQTWACyOCxEE1gAsjgsRBNYALI4LEQTWACyOCxEE1gAsjgsRBNYALI4LEQTWACyOCxEE1gAsDnsh1xc78fJ4G7ujh7Ters4PYms4Tjsv+SAuSFdcxHG0cRdvT5spKJdn42ia/YgYx9ZwlNxlynFMkOvTQbQbN19XmIHyjTE5dkRcChOkq2y2wD4ocxjtfbw+D1JWl7KL70O4IFkohTC6S2aD9EUphlEDZF2Ughh1QP6KUhSjFsiqKIUx6oH8hlIcoybIMpQm7iKie5j8fHFvbX+6U+bfZS1LP/+gN/WXNTHqLmRS/UKUuhj/E6TPE33yU/c6x/3Pj6zCKDVBFt1NdQgf3+R+vIqi1AP56dY28wvJdT5vEt5TC2SV54ziKHVAVsFYdvdV6OOrBshfMIqj8EHWwSiMwgbpg1EUhQuSgVEQhQky+yOHSPg6ZP7u6yi2h4cJd6qpRzBBukuc/AwoA2N2KW17Ett7U98Mp3ba6zAuSHdZ/lCuF65vTmiAvZCEC6x2hCAwMUEEgTUAi+NCBIE1AIvjQgSBNQCL40IEgTUAi+NCBIE1AIvjQgSBNQCL40IEgTUAi+NCBIE1AIvjQgSBNQCL40IEgTUAi+NCBIE1AIvjQgSBNQCL40IEgTUAi+NCBIE1AIvjQgSBNQCL40IEgTUAi+NCBIE1AIvzDg++XnTKuv6KAAAAAElFTkSuQmCC";


        return {
            masks: _.sortBy(masks, function(mask) {
                return mask.$.id;
            }),
            nullMask: masks.nullMaskSrc
        }
    }
});