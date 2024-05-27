let wrapper = document.getElementById('wrapper');
let circle = document.getElementById('circle');
const wss = new WebSocket('ws://192.168.128.1:2346')

wrapper.addEventListener('keyup', event => {
    let code = event.code;
    circle.style.backgroundColor = Math.random() < 0.5 ? 'red' : 'green';
    const step = 10;
    let top = circle.style.marginTop ? circle.style.marginTop : 0
    let left = circle.style.marginLeft ? circle.style.marginLeft : 0

    if (code === 'ArrowLeft') {
        circle.style.marginLeft = parseInt(left) - step + 'px';
    } else if (code === 'ArrowRight') {
        circle.style.marginLeft = parseInt(left) + step + 'px';
    } else if (code === 'ArrowUp') {
        circle.style.marginTop = parseInt(top) - step + 'px';
    } else if (code === 'ArrowDown') {
        circle.style.marginTop = parseInt(top) + step + 'px';
    } else {
        console.log("Boshqa");
    }

    let positionData = {
        top: circle.style.marginTop,
        left: circle.style.marginLeft,
        color: circle.style.backgroundColor
    }

    wss.send(JSON.stringify(positionData));
})

wss.onmessage = response => {
    let positionData = JSON.parse(response.data);
    console.log(positionData)
    circle.style.marginTop = positionData.top;
    circle.style.marginLeft = positionData.left;
    circle.style.backgroundColor = positionData.color;
}
