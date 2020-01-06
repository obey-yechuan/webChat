window.onload=function(){
	var input_box1 = document.getElementById('input_box1');
	console.log(input_box1);
	var btns = input_box1.getElementsByClassName('btn1');
	console.log(btns);
	var input_box2 = document.getElementById('input_box2');
	console.log(input_box2);
	var input_body1 = document.getElementById('input_body1');
	console.log(input_body1);
	var input_body2 = document.getElementById('input_body2');
	console.log(input_body2);
	for(var i = 0; i < btns.length; i++){

			var btn = btns[i];

			btn.onclick = function(){

			input_box1.style.left = '100%'; 
			
			input_box2.style.left = '10%';
			
			input_body1.style.left = '100%';
			
			input_body2.style.left = '10%';
		}
	}

	var btn2 = input_box2.getElementsByClassName('btn2');
	console.log(btn2);
	btn2.onclick = function(){
		input_box1.style.left = '10%'; 
			
		input_box2.style.left = '100%';
			
		input_body1.style.left = '10%';
			
		input_body2.style.left = '100%';
	}

}

				