import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from './const'
import { App } from './App'
import Scene from './Scene'
import KonvaIBoardConverter from './KonvaIBoardConverter'
import { Rect } from 'konva/lib/shapes/Rect'
import { Text } from 'konva/lib/shapes/Text'
import { Line } from 'konva/lib/shapes/Line'
import { Image } from 'konva/lib/shapes/Image'



const convertor = new KonvaIBoardConverter()
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

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App(SUPABASE_URL, SUPABASE_KEY)
  const scene = new Scene('konva-container', 500, 500)
  const list = await app.supabase.boards.list()
  const board = await app.supabase.boards.board(list[0].id)

  board.loadItems().then((items) => items.forEach((item) => scene.addKonvaItem(convertor.convertItem(item))))

  board.onInsert = (item) => scene.addKonvaItem(convertor.convertItem(item.new))
  board.onUpdate = (item) => scene.mutateItem(item.old.id, item.new)
  board.onDelete = (item) => scene.removeItem(item.old.id)

  scene.onUpdate = (id, attrs) => board.mutateItem({ id, attrs, board_id: board.id })

  document.querySelector('#konva-container').addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code == 'Delete') scene.forSelected((shape) => {
      board.removeItem(shape.id())
      shape.destroy()
    })
  })

  document.querySelector('#delete-button').addEventListener("click", (e) => {
    scene.forSelected((shape) => {
      board.removeItem(shape.id())
      shape.destroy()
    })
  })

  document.querySelector('#new-image-button').addEventListener("click", (e) => {
    board.addItem({
      id: crypto.randomUUID(),
      type: 'image',
      attrs: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SIPI_Jelly_Beans_4.1.07.tiff/lossy-page1-256px-SIPI_Jelly_Beans_4.1.07.tiff.jpg',
        x: 10,
        y: 10,
        height: 108,
        width: 192
      },
      board_id: board.id
    })
  })
  document.querySelector('#new-rect-button').addEventListener("click", (e) => {
    board.addItem({
      id: crypto.randomUUID(),
      type: 'rect',
      attrs: {
        x: 90,
        y: 90,
        width: 40,
        height: 40
      },
      board_id: board.id
    })
  })
  document.querySelector('#new-line-button').addEventListener("click", (e) => {
    board.addItem({
      id: crypto.randomUUID(),
      type: 'line',
      attrs: {
        points: [10, 20, 30, 40]
      },
      board_id: board.id
    })
  })

  //board.addItem({ id: crypto.randomUUID(), type: 'rect', attrs: { x: 90, y: 90, width: 40, height: 40 }, board_id: board.id })
  //board.addItem({ id: crypto.randomUUID(), type: 'text', attrs: { x: 30, y: 90, width: 40, height: 40, text: "Lo" }, board_id: board.id })
  //board.addItem({ id: crypto.randomUUID(), type: 'line', payload: { points: [10, 20, 30, 40] }, board_id: board.id })
  //board.addItem({ id: crypto.randomUUID(), type: 'image', payload: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SIPI_Jelly_Beans_4.1.07.tiff/lossy-page1-256px-SIPI_Jelly_Beans_4.1.07.tiff.jpg', x: 10, y: 10, height: 108, width: 192 }, board_id: board.id })
})









