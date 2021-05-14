if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', function(event) {
  const loadScript = async (url) => {
    const response = await fetch(url)
    const script = await response.text()
    eval(script)
  }  

  const scriptUrl = "js/graph.js"
  loadScript(scriptUrl)
})
