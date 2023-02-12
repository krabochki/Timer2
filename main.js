let ul = document.getElementsByTagName('ul');

let coordinates = [];
function coords() {
    for (let i = 0; i <= 2; i++) {
        let x = (ul[i].offsetWidth / 2) + ul[i].offsetLeft;
        let y = (ul[i].offsetHeight / 2) + ul[i].offsetTop - $(window).scrollTop();
        coordinates[i] = [x, y];
    }
}





$(window).on('load', function () {
    coords();
});
$(window).on('resize', function () {
    coords();
});
$(window).on('scroll', function () {
    coords();
});

let classlist = ['next', 'current', 'next2'];

let audio = new Audio('sound4.mp3');
audio.volume = 0.3;

let buttons = [];
for (let i = 0; i <= 2; i++) {
    buttons[i] = ul[i].getElementsByTagName('button');
}

let time = [];
for (let i = 0; i <= 2; i++) {
    time[0] = ['hours', '00'];
    time[1] = ['minutes', '00'];
    time[2] = ['seconds', '00'];
}

for (let i = 0; i <= 59; i++) {
    let number = document.createElement("button");
    if (i <= 9) {
        number.textContent = '0';
    }
    number.textContent += String(i);

    for (let j = 0; j <= ul.length - 1; j++) {
        if (i >= 24 && j == 0) {
            continue;
        }
        ul[j].appendChild(number.cloneNode(true));
    }
}

for (let i = 0; i <= buttons.length - 1; i++) {
    for (let j = 0; j <= 1; j++) {
        let classname;
        if (j === 0) {
            classname = classlist[1];
        }
        else {
            classname = classlist[0];
        }
        buttons[i][j].classList.add(classname);
    }
}

var current;
for (let i = 0; i <= ul.length - 1; i++) {
    ul[i].onscroll = function (e) {
        if (current != document.elementFromPoint(coordinates[i][0], coordinates[i][1])) {

        for (let j = 0; j <= buttons[i].length - 1; j++) {
            for (let k = 0; k <= classlist.length - 1; k++) {
                buttons[i][j].classList.remove(classlist[k]);

            }}
            document.elementFromPoint(coordinates[i][0], coordinates[i][1]).classList.add('current');
         


        }
           if (current != document.elementFromPoint(coordinates[i][0], coordinates[i][1])) {

                audio.pause();
                audio.currentTime = 0;
                var nopromise = {
                    catch: new Function()
                };
                (audio.play() || nopromise).catch(function () { });;
            

        for (let j = 0; j <= buttons[i].length - 1; j++) {

            
            if (buttons[i][j].classList.contains(classlist[1])) {


                if (j >= 1) {
                    buttons[i][j - 1].classList.add(classlist[0]);
                }
                if (j >= 2) {
                    buttons[i][j - 2].classList.add(classlist[2]);
                }
         
                if (j <= buttons[i].length - 2) {
                    buttons[i][j + 1].classList.add(classlist[0]);
                }
                if (j <= buttons[i].length - 3) {
                    buttons[i][j + 2].classList.add(classlist[2]);
                }

                
                time[i][1] = String(j);
                document.getElementById(time[i][0]).textContent = time[i][1];
                current = buttons[i][j];
            }
        }}

    };
}

