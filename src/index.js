import _ from 'lodash'
import './demo.css'
import './index.less'
import src from './img.png'
// import Print from './print'
function component() {

    const element = document.createElement('div')
    const myIcon = new Image();
    myIcon.src = src;
    
    element.innerHTML = _.join(['hello', 'webpack'], '')
    // element.onclick = Print.bind(null, 'Hello webpack!');
    element.className = "demo"
    element.appendChild(myIcon);
    return element
    
}
document.body.appendChild(component());