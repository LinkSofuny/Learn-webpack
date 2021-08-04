
async function getComponent() {

    const { default: _ } = await import('lodash')
    const element = document.createElement('div')

    element.innerHTML = _.join(['hello', 'webpack'], '')

    return element
    
}

getComponent().then( component => document.body.appendChild(component) )