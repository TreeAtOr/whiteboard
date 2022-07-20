
import KonvaIBoardConverter from '../app/KonvaIBoardConverter'
import { Rect } from 'konva/lib/shapes/Rect'
import { Text } from 'konva/lib/shapes/Text'
import { Line } from 'konva/lib/shapes/Line'
import { Image } from 'konva/lib/shapes/Image'
import { Transformer } from 'konva/lib/shapes/Transformer'
import { Stage } from 'konva/lib/Stage'

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
    const text: Text = new Text({ ...style, ...attrs, id });

    text.on('dblclick dbltap', function () {
        // create textarea over canvas with absolute position

        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = text.getAbsolutePosition();

        // then lets find position of stage container on the page:
        var stageBox = (this.getParent().getParent() as Stage).container().getBoundingClientRect();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
        };

        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = text.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = String(text.width());

        textarea.focus();

        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            if (e.keyCode === 13) {
                text.text(textarea.value);
                //@ts-ignore
                text.onUpdate(id, text.attrs)
                document.body.removeChild(textarea);
            }
        });
    });
    return text
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