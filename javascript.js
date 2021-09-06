//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//jika kita klik tombol mulai/mulai ulang
document.getElementById("startreset").onclick = function(){
    
    //jika pengguna main
    
    if(playing == true){
        
        location.reload(); //memuat ulang halaman
        
    }else{//jika pengguna sedang tidak bermain
        
        //mengubah mode menjadi bermain
        
        playing = true;
        
        //menyetel skor dari 0
        
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
     
        //menunjukkan sisa waktu
        
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //menyembunyikan kotak permainan berakhir
        hide("button");

        hide("gameOver");
        
        //mengubah tombol menjadi mulai ulang
        document.getElementById("startreset").innerHTML = "Mulai Lagi";
        
        //memulai waktu hitung mundur
        
        startCountdown();
        
        //membuat Pertanyaan dan Jawaban
        
        generateQA();
    }
    
}

//saat pengguna klik salah satu kotak jawaban

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //cek jika pengguna sedang bermain     
    if(playing == true){//sedang bermain
            
        if(this.innerHTML == correctAnswer){
        //jawbaan benar
            
            //menambahkan skor sebanyak 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;

            //sembunyikan kotak dengan jawaban yang salah dan menunjukkan kotak dengan jawaban yang benar
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
                   
            
            generateQA();
        }else{
            //mengurangin skor sebanyak 1
            score--;
            document.getElementById("scorevalue").innerHTML = score;

            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}

function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){// game berakhir
            stopCountdown();
            //show("button");
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Selesai</p><p>Skor Anda : " + score + "</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Mulai Lagi";
        }
    }, 1000);    
}

//berhentikkan timer

function stopCountdown(){
    clearInterval(action);   
}

//sembunyikkan elemen

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//menunjukkan elemen

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

//membuat soal dan jawaban pilihan ganda

function generateQA(){
    var x = 2+ Math.round(10*Math.random());
    var y = 2+ Math.round(10*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //mengisi satu kotak dengan 1 jawaban yang benar
    
    //mengisi kotak yang lain dengan jawaban yang salah
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //jawaban yang salah
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}



