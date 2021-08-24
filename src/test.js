// eslint-disable-next-line
console.log('btn 被加载了')

document.getElementById('btn').onclick = () => {
  import( /* webpackChunkName: 'print' */ './print' )
    .then( module => {
      // eslint-disable-next-line
      const print = module.default
      
      print()
    })
}