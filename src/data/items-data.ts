
import KonvaIBoardConverter from '../app/KonvaIBoardConverter'
import { Rect } from 'konva/lib/shapes/Rect'
import { Text } from 'konva/lib/shapes/Text'
import { Line } from 'konva/lib/shapes/Line'
import { Image } from 'konva/lib/shapes/Image'

const convertor = new KonvaIBoardConverter()

/*
    BELOW THIS LINE YOU DECLARE DEFAULT STYLES FOR APP
*/

convertor.createStyle("default", {
    fill: 'green',
    stroke: 'black',
    fontSize: 18,
    fontFamily: 'Calibri',
    align: 'center',
    strokeWidth: 2,
    draggable: true,
    lineCap: 'round',
    lineJoin: 'round',
})

/*
    BELOW THIS LINE YOU DECLARE ITEM TYPES
*/

convertor.registerItem("rect", (id, style, attrs) => {
    return new Rect({ ...style, ...attrs, id });
})

convertor.registerItem("text", (id, style, attrs) => {
    return new Text({ ...style, ...attrs, id });
})

convertor.registerItem("line", (id, style, attrs) => {
    return new Line({ ...style, ...attrs, id });
})

convertor.registerItem("image", (id, style, attrs) => {
    return new Promise((resolve, reject) => {
        Image.fromURL(attrs.url, (image: Image) => {
            image.setAttrs({ ...style, ...attrs, id })
            resolve(image)
        });
    })
})

export default convertor