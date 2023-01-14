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
    const divToShowIMG = document.querySelector('#Content');
    const zoomedImg = document.querySelector('.imgContent');

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
        console.log(event.target);
        if (event.target.classList.contains('addImgBtn')){
            useModal();
        }

        if (event.target.classList.contains(classForImages)) {
            console.log('class for images');
            //remove hyde class
            alertZone.classList.remove('hyde');
            divToShowIMG.classList.remove('hyde');
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
            alertZone.classList.add('hyde');
            divToShowIMG.classList.add('hyde');
        }
    });
    render();

    function useModal(){
        alertZone.classList.remove('hyde');
        // divToShowIMG.classList.remove('hyde');
        const modalWindow = document.createElement('div');
        modalWindow.classList.add('modalWindow');


        alertZone.appendChild(modalWindow);
        addNewElementToDatabase(newItem);
    }
    function addNewElementToDatabase(itemToAdd){

    }
})()