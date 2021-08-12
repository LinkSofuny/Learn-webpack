import _ from 'lodash'
import './demo.css'
import './index.less'
// import Print from './print'
function component() {

    const element = document.createElement('div')

    element.innerHTML = _.join(['hello', 'webpack'], '')
    // element.onclick = Print.bind(null, 'Hello webpack!');
    element.className = "demo"
    return element
    
}
document.body.appendChild(component());