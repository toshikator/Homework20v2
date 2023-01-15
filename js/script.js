(()=>{
    const imgDB = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
        './img/11.jpg',
    ];
    const classForImages = 'imagesLine';

    const listOfImages = document.querySelector('#imgList');
    const alertZone = document.querySelector('#alertZone');
    const divToShowIMG = document.querySelector('#content');
    const zoomedImg = document.querySelector('.imgContent');

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modalWindow');
    const imgSrc = document.createElement('input');
    imgSrc.setAttribute('type','url');
    imgSrc.classList.add('imgSrcInput');
    imgSrc.setAttribute('placeholder', "Add Url For New Image");
    const btnApply = document.createElement('button');
    btnApply.innerHTML = 'Done';
    btnApply.setAttribute('id','btnApply');
    btnApply.classList.add('btnApply');

    const render = () =>{
        listOfImages.innerHTML = '';
        const buttonToAddImage = document.createElement('button');
        buttonToAddImage.classList.add('addImgBtn');
        buttonToAddImage.textContent = 'Add new image'
        document.querySelector('body').appendChild(buttonToAddImage);

        imgDB.forEach((element)=> {
            newImg = document.createElement('img');
            newImg.src = element;

            newImg.setAttribute('databaseId',imgDB.indexOf(element));
            newImg.classList.add('imagesLine');
            listOfImages.appendChild(newImg);
        });
    }

    // console.log(imgDB);

    document.addEventListener('click',(event)=>{
        // console.log(event);
        // console.log(event.target);
        if(event.target.getAttribute('id') === 'btnApply') {
            addNewElementToDatabase(imgSrc.value);
            imgSrc.value = '';
        } else if (event.target.classList.contains('addImgBtn')) {
            useModal();
        } else if(event.target.getAttribute('type') === 'url') {
            // alert('Must be really pretty!')
            // const userNotification = document.createElement('span');
            // userNotification.setAttribute('textContent', 'Must be really pretty');
            // modalWindow.appendChild(userNotification);
        }else if (event.target.classList.contains(classForImages)) {
            //remove hide class
            alertZone.classList.remove('hide');
            divToShowIMG.classList.remove('hide');
            //buttons
            const leftButton = document.createElement("img");
            const rightButton = document.createElement("img");
            leftButton.src = './icon/prev.png';
            leftButton.classList.add('prevBtn');
            rightButton.src = './icon/next.png';
            rightButton.classList.add('nextBtn');
            leftButton.classList.add('navBtn');
            rightButton.classList.add('navBtn');
            alertZone.appendChild(leftButton);
            alertZone.appendChild(rightButton);
            //show img with zoom
            zoomedImg.setAttribute('src',event.target.getAttribute('src'));
            zoomedImg.setAttribute('databaseId',event.target.getAttribute('databaseId'));
        } else if(event.target.classList.contains('navBtn')){
            console.log('class NavBtn');
            if(event.pageX < 300){
                 let prevId = imgDB.indexOf(zoomedImg.getAttribute('src')) - 1;
                 if (prevId < 0 ) prevId = imgDB.length - 1;
                zoomedImg.setAttribute('src',imgDB[prevId]);

            } else if(event.pageX > (window.innerWidth - 300)){
                let nextId = imgDB.indexOf(zoomedImg.getAttribute('src')) + 1;
                if (nextId >= imgDB.length ) nextId = 0;
                zoomedImg.setAttribute('src',imgDB[nextId]);

            }
        } else {
            console.log('else');
            alertZone.innerHTML = '';
            alertZone.classList.add('hide');
            divToShowIMG.classList.add('hide');
        }
    });
    loadDatabaseFromLocalStorage();
    render();

    function useModal(){
        alertZone.classList.remove('hide');
        divToShowIMG.classList.add('hide');
        // divToShowIMG.classList.remove('hide');


        alertZone.appendChild(modalWindow);
        modalWindow.appendChild(imgSrc);
        modalWindow.appendChild(btnApply);


    }
    function addNewElementToDatabase(itemToAdd){
        console.log(itemToAdd);
        const image = new Image();
        image.src = itemToAdd;
        image.addEventListener('load', () => {
            imgDB.push(itemToAdd);
            render();
            alertZone.classList.add('hide');
            saveDatabaseToLocalstorage();
        });
        image.addEventListener('error', () => {
            alert('incorrect link, check it please');
        });
    }
    function saveDatabaseToLocalstorage() {
        localStorage.setItem('imgDB',JSON.stringify(imgDB));
    }
    function loadDatabaseFromLocalStorage() {

        if (localStorage.key('imgDB')) {
            const temp = JSON.parse(localStorage.getItem('imgDB'));
            temp.forEach((value) => {
                if (imgDB.includes(value)) {

                } else {
                    imgDB.push(value);
                }
            });
        }
    }
})()