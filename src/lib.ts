export function renderBlock (elementId:string, html:string) {
  const element = document.getElementById(elementId)
  if (element) element.innerHTML = html
}
type Message = {
  type: "success"|"error",
  text: string
}
type Action = {
  name: string,
  handler: any
}
export function renderToast (message:Message, action?:Action) {
  let messageText = ''
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function() {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast({type:'error', text: '35 str, lib.ts'})
    }
  }
}
