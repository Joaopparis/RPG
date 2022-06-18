let toggle = document.querySelector("input[type='checkbox']")
let root = document.querySelector(':root')

toggle.addEventListener('change', () =>{
    if(!root.classList.contains('dark-theme')){
        root.classList.add('dark-theme')
    }else{
        root.classList.remove('dark-theme')
    }
})

function SlideShow(){
    let slider = document.querySelector('#slider div')
    let foward = true
    let i = 0
    
    setInterval(() => {
        if(foward){
            let fwd = setInterval(()=>{
                slider.style.transform = `translateX(-${i}%)`
                
                if(i < 100)
                    i++
                else if(i == 100){
                    i++
                    clearInterval(fwd)
                }
                else if(i > 100 && i < 200)
                    i++
                else if(i == 200){
                    foward = false
                    clearInterval(fwd)
                }
            }, 5)
        }else{
            let bwd = setInterval(()=>{
                slider.style.transform = `translateX(-${i}%)`
                
                if(i > 100)
                    i--
                else if(i == 100){
                    i--
                    clearInterval(bwd)
                }
                else if(i > 0 && i < 100)
                    i--
                else if(i == 0){
                    foward = true
                    clearInterval(bwd)
                }
            }, 5)
        }
    }, 5000)
}


fetch("./content/pages/main.html")
    .then(resp => resp.text())
    .then(html => document.querySelector('main div').innerHTML = html)
    .then(() =>{
        document.querySelector('header nav').insertAdjacentHTML('afterend', "<div id='slider'><div><img src='content/img/slide1.png' alt='slide1'><img src='content/img/slide2.png' alt='slide2'><img src='content/img/slide3.png' alt='slide3'></div></div>")
        SlideShow()
    })

document.querySelectorAll('nav ul a[href]').forEach(link=>{
    link.onclick = e =>{
        e.preventDefault()

        document.querySelectorAll('nav ul a[href]').forEach(a => a.classList.remove('actived'))

        link.classList.add('actived')

        if(link.getAttribute('href') == './content/pages/reservas.html'){
            document.querySelector('html').style.height = '100%'
            document.querySelector('footer').style.position = 'absolute'
        }
        else{
            document.querySelector('html').style.height = 'auto'
            document.querySelector('footer').style.position = 'initial'
        }

        if(document.querySelector('#slider') != null)
            document.querySelector('#slider').remove()

        fetch(link.getAttribute('href'))
            .then(resp => resp.text())
            .then(html => document.querySelector('main div').innerHTML = html)
            .then(() => {
                if(link.getAttribute('href') == "./content/pages/main.html"){
                    document.querySelector('header nav').insertAdjacentHTML('afterend', "<div id='slider'><div><img src='content/img/slide1.png' alt='slide1'><img src='content/img/slide2.png' alt='slide2'><img src='content/img/slide3.png' alt='slide3'></div></div>")
                    SlideShow()
                }
            })
    }
})

function Forms(){
    let cpf = document.querySelector("input[name='cpf']").value
    let dia = document.querySelector("input[name='dia']").value
    let horario = document.querySelector("input[name='horario']").value
    let lugares = document.querySelector("input[name='lugares']").value
    let comentarios = document.querySelector("textarea[name='comentarios']").value

    if(cpf != "" || dia != "" || horario != "" || lugares != "" || comentarios != ""){
        alert('Reservado com sucesso!!!')
    }
    else{
        alert('Error!!!')
    }
}