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
    const blurDiv = document.querySelector('#alertZone');
    const divToShowIMG = document.querySelector('#Content');

    const render = () =>{
        listOfImages.innerHTML = '';
        const buttonToAddImage = document.createElement('button');
        buttonToAddImage.classList.add('addImgBtn');
        buttonToAddImage.textContent = 'Add new image'
        document.querySelector('body').appendChild(buttonToAddImage);
        //TODO add to #imgList images 80*80
        imgDB.forEach((element)=> {
            newImg = document.createElement('img');//variant 1
            newImg.src = element;
            newImg.classList.add('imagesLine');
            listOfImages.appendChild(newImg);
        });
    }

    // console.log(imgDB);

    document.addEventListener('click',(event)=>{
        // console.log(event);
        console.log(event.target);
        if (event.target.classList.contains(addImgBtn)){
            useModal();
        }

        if (event.target.classList.contains(classForImages)) {
            // console.log(event);
            blurDiv.classList.remove('hyde');
            divToShowIMG.classList.remove('hyde');
            event.target.classList.remove('imagesLine');
            event.target.classList.add('bigMode');
            const leftButton = document.createElement("img");
            const rightButton = document.createElement("img");
            leftButton.src = './icon/prev.png';
            leftButton.classList.add('prevBtn');
            rightButton.src = './icon/next.png';
            rightButton.classList.add('nextBtn');
            leftButton.classList.add('navBtn');
            rightButton.classList.add('navBtn');
            blurDiv.appendChild(leftButton);
            blurDiv.appendChild(rightButton);
        } else if(event.target.classList.contains('bigMode')){
            event.target.classList.add('imagesLine');
            event.target.classList.remove('bigMode');
            blurDiv.classList.add('hyde');
            divToShowIMG.classList.add('hyde');
        } else if(event.target.classList.contains('navBtn')){
            if(event.pageX < 300){
                let temp = document.querySelector('.bigMode').previousElementSibling;
                if (!temp){
                    const allImg = document.querySelectorAll('.imagesLine');
                    temp = allImg[allImg.length-1];
                }
                document.querySelector('.bigMode').classList.add('imagesLine');
                document.querySelector('.bigMode').classList.remove('bigMode');
                temp.classList.add('bigMode');
                temp.classList.remove('imagesLine')
            } else if(event.pageX > (window.innerWidth - 300)){
                let temp = document.querySelector('.bigMode').nextElementSibling;
                if (!temp) temp = document.querySelectorAll('.imagesLine')[0];
                document.querySelector('.bigMode').classList.add('imagesLine');
                document.querySelector('.bigMode').classList.remove('bigMode');
                temp.classList.add('bigMode');
                temp.classList.remove('imagesLine')
            }
        } else {
            blurDiv.classList.add('hyde');
            divToShowIMG.classList.add('hyde');
            document.querySelector('.bigMode').classList.add('imagesLine');
            document.querySelector('.bigMode').classList.remove('bigMode');
        }
    });
    render();

    function useModal(){


        addNewElementToDatabase(newItem);
    }
    function addNewElementToDatabase(itemToAdd){

    }
})()