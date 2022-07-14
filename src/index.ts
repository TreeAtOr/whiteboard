import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from './data/const'
import { App } from './app/App'
import Scene from './app/Scene'


import { BoardView } from './view/BoardView/BoardView'

import './styles.css'

document.addEventListener('DOMContentLoaded', async () => {
  //@ts-ignore
  window.app = new App(SUPABASE_URL, SUPABASE_KEY)
})



/*


document.addEventListener('DOMContentLoaded', async () => {
  const app = new App(SUPABASE_URL, SUPABASE_KEY)
  const scene = new Scene('konva-container', 500, 500)
  const list = await app.supabase.boards.list()

  document.querySelector('#boards-list').innerHTML = list.map((item) => `<option value="${item.id}">${item.title}</option>`).join('\n')
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
})



*/





