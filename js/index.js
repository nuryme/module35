// function loadCategories() {
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => showCategory(data))
    .catch(err => console.error(err))

// }
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(const btn of buttons) {
        btn.classList.remove('active')
    }
}
function showCategoryVideos(id) {
    // alert('videos')
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.remove('bg-[#25252533]')
            activeBtn.classList.add("active")
            showVideo(data.category)
        })
        .catch(error => console.error(error))
}
function showCategory(data) {
    const categories = data.categories;
    const categorySection = document.getElementById('category-section')
    // for(const category of categories) {
    //     console.log(category)
    //     const button = document.createElement('button')
    //     button.className = ('rounded px-5 py-2 bg-[#25252533] text-lg font-medium hover:bg-[#FF1F3D] hover:text-white')
    //     button.innerText = `${category.category}`
    //     categorySection.appendChild(button)
    // }
    categories.map((category) => {
        // console.log(category)
        const buttonContainer = document.createElement('div')
        // button.className = ('rounded px-5 py-2 bg-[#25252533] text-lg font-medium hover:bg-[#FF1F3D] hover:text-white')
        // button.innerText = `${category.category}`
        buttonContainer.innerHTML = `
        <button id = 'btn-${category.category_id}' onclick = 'showCategoryVideos(${category.category_id})' class = 'btn rounded px-5 py-2 bg-[#25252533] text-lg font-medium hover:bg-[#FF1F3D] hover:text-white category-btn'>${category.category}</button>
        `
        categorySection.appendChild(buttonContainer)

        const categoryId = category.category_id;
    })
}
// loadCategories()

//--------------------- video section
function getTime(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour}hrs ${minute}min ${remainingSecond}s`
}

function loadVideo(searchText = '') {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => showVideo(data.videos))
}
const videoDetails = async (videoId) => {
    // console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    showVideoDetails(data.video)
}
const showVideoDetails = (videoDetails) => {
    console.log(videoDetails)
    const videoContent = document.getElementById('video-content')
    videoContent.innerHTML = `
    <img src = '${videoDetails.thumbnail}' class = 'rounded-xl'>
    <p class = 'mt-4'>${videoDetails.description}</p>
    `
    
    //way-1
    // document.getElementById('showModalData').click()

    // way-2
    document.getElementById('my_modal_5').showModal();
}
const showVideo = (data) => {
    const videoSection = document.getElementById('video-section')
    videoSection.innerHTML = ''
    if (data.length == 0) {
        videoSection.classList.remove('grid')
        videoSection.innerHTML = `
        <div class = 'min-h-[600px] w-full flex flex-col items-center justify-center'>
            <img class = ' w-[140px] h-[140px]' src="assets/Icon.png" alt="">
            <h1 class="text-4xl font-bold left-11 w-[433px] mx-auto mt-8 text-center">Oops!! Sorry, There is no content here</h1>
        </div>
        `
    }
    else {
        videoSection.classList.add('grid')
    }
    data.map((videoData) => {
        // console.log(videoData)
        const div = document.createElement('div')
        div.className = ('')
        div.innerHTML = `
        <div class = 'relative' onclick = "videoDetails('${videoData.video_id
        }')">
            <img class = 'rounded-lg w-[312px] h-[200px]' src="${videoData.thumbnail}" alt="">
            ${videoData.others.posted_date?.length == 0 ? '' : `<span class = 'absolute right-2 bottom-2 bg-black text-white/80 p-1 rounded-md'>${getTime(videoData.others.posted_date)}</span>`
            }
        </div>
        <div class = 'flex gap-3 mt-5'>
            <img class = 'rounded-full w-[40px] h-[40px] object-cover' src="${videoData.authors[0].profile_picture}" alt="">
            <div>
                <h4 class = 'font-bold leading-7'>${videoData.title}</h4>
                <div class = 'flex gap-2 items-center'>
                    <p class = 'text-sm'>${videoData.authors[0].profile_name}</p>
                    ${videoData.authors[0].verified == true ? `<img class = "w-5 h-5" src = "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">` : ''}
                    
                </div>
                <p class = 'text-sm'>${videoData.others.views} views</span></p>
            </div>
        </div>
        `
        videoSection.appendChild(div)
    })
}

document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideo(e.target.value)
})

loadVideo()