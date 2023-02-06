"use strict";
exports.__esModule = true;
exports.renderToast = exports.renderBlock = void 0;
function renderBlock(elementId, html) {
    var element = document.getElementById(elementId);
    element.innerHTML = html;
}
exports.renderBlock = renderBlock;
function renderToast(message, action) {
    var messageText = '';
    if (message != null) {
        messageText = "\n      <div id=\"info-block\" class=\"info-block ".concat(message.type, "\">\n        <p>").concat(message.text, "</p>\n        <button id=\"toast-main-action\">").concat((action === null || action === void 0 ? void 0 : action.name) || 'Закрыть', "</button>\n      </div>\n    ");
    }
    renderBlock('toast-block', messageText);
    var button = document.getElementById('toast-main-action');
    if (button != null) {
        button.onclick = function () {
            if (action != null && action.handler != null) {
                action.handler();
            }
            renderToast(null);
        };
    }
}
exports.renderToast = renderToast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGliLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFdBQVcsQ0FBRSxTQUFTLEVBQUUsSUFBSTtJQUMxQyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2xELE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBQzFCLENBQUM7QUFIRCxrQ0FHQztBQUVELFNBQWdCLFdBQVcsQ0FBRSxPQUFPLEVBQUUsTUFBTztJQUMzQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFDcEIsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ25CLFdBQVcsR0FBRyw0REFDNkIsT0FBTyxDQUFDLElBQUksNkJBQzlDLE9BQU8sQ0FBQyxJQUFJLDREQUNnQixDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLEtBQUksU0FBUyxrQ0FFN0QsQ0FBQTtLQUNGO0lBRUQsV0FBVyxDQUNULGFBQWEsRUFDYixXQUFXLENBQ1osQ0FBQTtJQUVELElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUMzRCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDbEIsTUFBTSxDQUFDLE9BQU8sR0FBRztZQUNmLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDNUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO2FBQ2pCO1lBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQTtLQUNGO0FBQ0gsQ0FBQztBQXpCRCxrQ0F5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmVuZGVyQmxvY2sgKGVsZW1lbnRJZCwgaHRtbCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKVxuICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclRvYXN0IChtZXNzYWdlLCBhY3Rpb24/KSB7XG4gIGxldCBtZXNzYWdlVGV4dCA9ICcnXG4gIGlmIChtZXNzYWdlICE9IG51bGwpIHtcbiAgICBtZXNzYWdlVGV4dCA9IGBcbiAgICAgIDxkaXYgaWQ9XCJpbmZvLWJsb2NrXCIgY2xhc3M9XCJpbmZvLWJsb2NrICR7bWVzc2FnZS50eXBlfVwiPlxuICAgICAgICA8cD4ke21lc3NhZ2UudGV4dH08L3A+XG4gICAgICAgIDxidXR0b24gaWQ9XCJ0b2FzdC1tYWluLWFjdGlvblwiPiR7YWN0aW9uPy5uYW1lIHx8ICfQl9Cw0LrRgNGL0YLRjCd9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICBgXG4gIH1cbiAgXG4gIHJlbmRlckJsb2NrKFxuICAgICd0b2FzdC1ibG9jaycsXG4gICAgbWVzc2FnZVRleHRcbiAgKVxuXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC1tYWluLWFjdGlvbicpXG4gIGlmIChidXR0b24gIT0gbnVsbCkge1xuICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoYWN0aW9uICE9IG51bGwgJiYgYWN0aW9uLmhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICBhY3Rpb24uaGFuZGxlcigpXG4gICAgICB9XG4gICAgICByZW5kZXJUb2FzdChudWxsKVxuICAgIH1cbiAgfVxufVxuIl19