
  const updateButton = document.querySelector('button#update-button')
  const deleteButton = document.getElementById('delete-button')
  const message = document.querySelector('#message')

  // document.addEventListener('DOMContentLoaded', function () {
  // init();
  deleteButton.addEventListener('submit', e => {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh');
    fetch('/tasks', {
      method: 'DELETE',
      //headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "orine",
        decription: "bason"   
      })
      })  
      .then(res => {
        if (res.ok) return res.json()
        messageDiv.textContent = 'ok' 
      })
      .then(data => {
        window.location.reload(true)
      })
      },false)

updateButton.addEventListener('click', function() {
    fetch('/tasks', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'orine' ,
        description: 'bason'
      })
    })
  })

