import * as fs from "fs";

let file1:string = process.argv[2];
let file2:string = process.argv[3];

let filetext:string="";

try{
    filetext=fs.readFileSync(file1,'utf-8');
}catch (erreur){
    console.log("No file to read!");
}

let Array:string[] = filetext.split("\n");
//console.log("--------Array-------");
//console.log(Array);

/*let rex = /\s/;
Array.filter(rex.test.bind(rex));
Array=Array.filter(function(e) {
    return String(e).trim();
});*/

let Array2:string[]=[];

let Variables_array:string[]=[];
let svg_array:string[]=[];
let times:number=0;
let LOOP_index:number=-1;
let Bool_if:boolean=false;
let Bool_else:boolean=false;
let Bool_end:boolean=false;
let svg_instr:string;
let x:number=0;
let y:number=0;
let rp:number=0;
let gp:number=0;
let bp:number=0;
let rf:number=255;
let gf:number=255;
let bf:number=255;

//console.log("------Array------");
//console.log(Array);

for(let i=0;i<Array.length;i++){
    let Nb_line:number=i+1;
    let Values_array:number[]=[];
	Array2=Array[i].toString().split(" ");
    //console.log("--------Array2-------");
    //console.log(Array2);
    
    Array2=Array2.filter(function(entry) { return entry.trim() != ''; });
    //console.log("--------Array2/trim-------");
    //console.log(Array2);

    if(Array2[0] == "&"){
        continue;
    }

    //console.log("-----Array2-----");
    //console.log(Array2);
    
   //position
   if(Array2[0] == "POSITION:"){
    if(Array2.length == 3){
        for(let j=1;j<Array2.length;j++){
            if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                console.log("ERROR LINE ("+Nb_line+"): POSITION parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
            }else if(Number.isInteger(parseInt(Array2[j]))){
                Values_array.push(parseInt(Array2[j]));
            }else if(Array2[j].charAt(0) == "%"){
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[j]==Variables_array[k]){
                        Values_array.push(parseInt(Variables_array[k+1]));
                    }
                }
            }
        }
    }else{
        let compteur=0;
        for(let j=1;j<Array2.length;j++){
            compteur++;
        }
        console.log("ERROR LINE ("+Nb_line+"): POSITION has 2 parameters, you wrote "+compteur);
    }
    x=Values_array[0];
    y=Values_array[1];
    //console.log(x+" "+y);
    }
    
    //LINE:
    if(Array2[0] == "LINE:"){
        if(Array2.length == 4){
            if(Array2[3] == "location"){
                for(let j=1;j<Array2.length-1;j++){
                    if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                        console.log("ERROR LINE ("+Nb_line+"): LINE parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                    }else if(Number.isInteger(parseInt(Array2[j]))){
                        Values_array.push(parseInt(Array2[j]));
                    }else if(Array2[j].charAt(0) == "%"){
                        for(let k=0;k<Variables_array.length;k+=2){
                            if(Array2[j]==Variables_array[k]){
                                Values_array.push(parseInt(Variables_array[k+1]));
                            }
                        }
                    }
                }
                let x1=Values_array[0];
                let y1=Values_array[1];
               
                //svg:
                svg_instr="<line x1=\""+x+"\" y1=\""+y+"\" x2=\""+x1+"\" y2=\""+y1+"\" style=\"stroke:rgb("+rp+","+gp+","+bp+");stroke-width:1\" />";
                svg_array.push(svg_instr);
                x=x1;
                y=y1;
                //console.log(x1+" "+y1+" "+x+" "+y);
            }else if(Array2[3] == "polar"){
                for(let j=1;j<Array2.length-1;j++){
                    if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                        console.log("ERROR LINE ("+Nb_line+"): LINE parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                    }else if(Number.isInteger(parseInt(Array2[j]))){
                        Values_array.push(parseInt(Array2[j]));
                    }else if(Array2[j].charAt(0) == "%"){
                        for(let k=0;k<Variables_array.length;k+=2){
                            if(Array2[j]==Variables_array[k]){
                                Values_array.push(parseInt(Variables_array[k+1]));
                            }
                        }                      
                    }
                }
                
                let l=Values_array[0];
                let a=Values_array[1];
                let x1= x+ Math.abs(Math.round(l * Math.cos((a*Math.PI)/180)));
                let y1= y+ Math.abs(Math.round(l * Math.sin((a*Math.PI)/180)));
                //console.log(l+" "+a);
                //svg
                svg_instr="<line x1=\""+x+"\" y1=\""+y+"\" x2=\""+x1+"\" y2=\""+y1+"\" style=\"stroke:rgb("+rp+","+gp+","+bp+");stroke-width:1\" />";
                svg_array.push(svg_instr);
                x=x1;
                y=y1;
            }else{
                console.log("ERROR LINE ("+Nb_line+"): LINE parameter 3 requires one of (location, polar), you wrote "+Array2[3]);
            } 
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): LINE has 3 parameters, you wrote "+compteur);
        }
        
    }

    //CIRCLE:
    if(Array2[0] == "CIRCLE:"){
        if(Array2.length == 4){
            for(let j=1;j<Array2.length;j++){
                if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                    console.log("ERROR LINE "+Nb_line+": CIRCLE parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                }else if(Number.isInteger(parseInt(Array2[j]))){
                    Values_array.push(parseInt(Array2[j]));
                }else if(Array2[j].charAt(0) == "%"){
                    let Cir_int=0;
                    for(let k=0;k<Variables_array.length;k+=2){
                        if(Array2[j]==Variables_array[k]){
                            Values_array.push(parseInt(Variables_array[k+1]));
                            Cir_int=1;
                        }
                    }
                    if(Cir_int=0){
                        console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[j]);
                    }
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE "+Nb_line+": CIRCLE has 3 parameters, you wrote "+compteur+" parameters");
        }
        let x:number=Values_array[0];
        let y:number=Values_array[1];
        let r:number=Values_array[2];
        //console.log(x+" "+y+" "+r);
        //svg:
        svg_instr="<circle cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\" stroke=\"rgb("+rp+","+gp+","+bp+")\" stroke-width=\"1\" fill=\"rgb("+rf+","+gf+","+bf+")\" />"
        svg_array.push(svg_instr);
    }

    //ELLIPSE:
    if(Array2[0] == "ELLIPSE:"){
        
        if(Array2.length == 5){
            for(let j=1;j<Array2.length;j++){
                if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                    console.log("ERROR LINE ("+Nb_line+"): ELLIPSE parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                }else if(Number.isInteger(parseInt(Array2[j]))){
                    Values_array.push(parseInt(Array2[j]));
                }else if(Array2[j].charAt(0) == "%"){
                    let Ell_int=0;
                    for(let k=0;k<Variables_array.length;k+=2){
                        if(Array2[j]==Variables_array[k]){
                            Values_array.push(parseInt(Variables_array[k+1]));
                            Ell_int=1;
                        }
                    }
                    if(Ell_int=0){
                        console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[j]);
                    }
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): ELLIPSE has 4 parameters, you wrote "+compteur);
        }
        let x1:number=Values_array[0];
        let y1:number=Values_array[1];
        let r1:number=Values_array[2];
        let r2:number=Values_array[3];
        //console.log(x+" "+y+" "+r1+" "+r2);
        //svg:
        svg_instr="<ellipse cx=\""+x1+"\" cy=\""+y1+"\" rx=\""+r1+"\" ry=\""+r2+"\" stroke=\"rgb("+rp+","+gp+","+bp+")\" stroke-width=\"1\" fill=\"rgb("+rf+","+gf+","+bf+")\" />"
        svg_array.push(svg_instr);
    }

    //RECTANGLE:
    if(Array2[0] == "RECTANGLE:"){
        if(Array2.length == 5){
            for(let j=1;j<Array2.length;j++){
                if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                    console.log("ERROR LINE ("+Nb_line+"): RECTANGLE parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                }else if(Number.isInteger(parseInt(Array2[j]))){
                    Values_array.push(parseInt(Array2[j]));
                }else if(Array2[j].charAt(0) == "%"){
                    let Rect_int=0;
                    for(let k=0;k<Variables_array.length;k+=2){
                        if(Array2[j]==Variables_array[k]){
                            Values_array.push(parseInt(Variables_array[k+1]));
                            Rect_int=1;
                        }
                    }
                    if(Rect_int=0){
                        console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[j]);
                    }
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): RECTANGLE has 4 parameters, you wrote "+compteur);
        }
        let x1:number=Values_array[0];
        let y1:number=Values_array[1];
        let x2:number=Values_array[2];
        let y2:number=Values_array[3];
        //console.log(x1+" "+y1+" "+x2+" "+y2);
        //svg:
        let a2:number=0;
        svg_instr="<polygon points=\""+x1+","+y1+" "+x2+","+y1+" "+x2+","+y2+" "+x1+","+y2+"\"  stroke=\"rgb("+rp+","+gp+","+bp+")\" stroke-width=\"1\" fill=\"rgb("+rf+","+gf+","+bf+")\" ></polygon>"
        svg_array.push(svg_instr);
    }
	//COLOR:
    if(Array2[0] == "COLOR:"){
        if(Array2.length == 5){
            if(Array2[1] == "pen"){
                for(let j=2;j<Array2.length;j++){
                    if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                        console.log("ERROR LINE ("+Nb_line+"): COLOR parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                    }else if(Number.isInteger(parseInt(Array2[j]))){
                        if(parseInt(Array2[j])>=0 && parseInt(Array2[j])<=255 ){
                            Values_array.push(parseInt(Array2[j]));
                        }else{
                            console.log("ERROR LINE ("+Nb_line+"): COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Array2[j]);
                        }
                    }else if(Array2[j].charAt(0) == "%"){
                        let color_int=0;
                        let Col_int=0;
                        let a:number=0;
                        for(let k=0;k<Variables_array.length;k+=2){
                            if(Array2[j]==Variables_array[k]){
                                Col_int=1;
                                a=k+1;
                                if(parseInt(Variables_array[k+1])>=0 && parseInt(Variables_array[k+1])<=255){
                                    Values_array.push(parseInt(Variables_array[k+1]));
                                    color_int=1;
                                }
                            }
                        }
                        if(color_int=0){
                            console.log("ERROR LINE ("+Nb_line+"): COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Variables_array[a]);
                        }
                        if(Col_int=0){
                            console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[j]);
                        }
                    }
                }
                rp=Values_array[0];
                gp=Values_array[1];
                bp=Values_array[2];
            }else if(Array2[1] == "fill"){
                for(let j=2;j<Array2.length;j++){
                    if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                        console.log("ERROR LINE ("+Nb_line+"): COLOR parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                    }else if(Number.isInteger(parseInt(Array2[j]))){
                        if(parseInt(Array2[j])>=0 && parseInt(Array2[j])<=255 ){
                            Values_array.push(parseInt(Array2[j]));
                        }else{
                            console.log("ERROR LINE ("+Nb_line+"): COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Array2[j]);
                        }
                    }else if(Array2[j].charAt(0) == "%"){
                        let color_int=0;
                        let Col_int=0;
                        let a:number=0;
                        for(let k=0;k<Variables_array.length;k+=2){
                            if(Array2[j]==Variables_array[k]){
                                Col_int=1;
                                a=k+1;
                                if(parseInt(Variables_array[k+1])>=0 && parseInt(Variables_array[k+1])<=255){
                                    Values_array.push(parseInt(Variables_array[k+1]));
                                }
                            }
                        }
                        if(color_int=0){
                            console.log("ERROR LINE ("+Nb_line+"): COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Variables_array[a]);
                        }
                        if(Col_int=0){
                            console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[j]);
                        }
                    }
                }
                rf=Values_array[0];
                gf=Values_array[1];
                bf=Values_array[2];
            }else{ 
                console.log("ERROR LINE ("+Nb_line+"): COLOR parameter 1 needs to be one of one of (pen, fill), you wrote "+Array2[1]);
            }   
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): RECTANGLE has 4 parameters, you wrote "+compteur);
        }
    }

    /*//COLOR:
    if(Array2[0] == "COLOR:"){
        if(Array2.length == 5){
            if(Array2[1] == "pen"){
                for(let j=2;j<Array2.length;j++){
                    if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                        console.log("ERROR LINE "+Nb_line+": COLOR parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                    }else if(Number.isInteger(parseInt(Array2[j]))){
                        if(parseInt(Array2[j])>=0 && parseInt(Array2[j])<=255 ){
                            Values_array.push(parseInt(Array2[j]));
                        }else{
                            console.log("ERROR LINE "+Nb_line+": COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Array2[j]);
                        }
                    }else if(Array2[j].charAt(0) == "%"){
                        for(let k=0;k<Variables_array.length;k+=2){
                            if(Array2[j].includes(Variables_array[k])){
                                if(parseInt(Variables_array[k+1])>=0 && parseInt(Variables_array[k+1])<=255){
                                    Values_array.push(parseInt(Variables_array[k+1]));
                                }else{
                                    console.log("ERROR LINE "+Nb_line+": COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Variables_array[k+1]);
                                }
                            }
                        }
                    }
                }
                rp=Values_array[0];
                gp=Values_array[1];
                bp=Values_array[2];
            }else if(Array2[1] == "fill"){
                for(let j=2;j<Array2.length;j++){
                    if( Array2[j].charAt(0) != "%" && !Number.isInteger(parseInt(Array2[j]))){
                        console.log("ERROR LINE "+Nb_line+": COLOR parameter "+j+" requires a number or a variable, you wrote "+Array2[j]);
                    }else if(Number.isInteger(parseInt(Array2[j]))){
                        if(parseInt(Array2[j])>=0 && parseInt(Array2[j])<=255 ){
                            Values_array.push(parseInt(Array2[j]));
                        }else{
                            console.log("ERROR LINE "+Nb_line+": COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Array2[j]);
                        }
                    }else if(Array2[j].charAt(0) == "%"){
                        for(let k=0;k<Variables_array.length;k+=2){
                            if(Array2[j]==Variables_array[k]){
                                if(parseInt(Array2[k+1])>=0 && parseInt(Array2[k+1])<=255){
                                    Values_array.push(parseInt(Variables_array[k+1]));
                                }else{
                                    console.log("ERROR LINE "+Nb_line+": COLOR parameter "+j+" requires a number or a variable between [0, 255], you wrote "+Variables_array[k+1]);
                                }
                            }
                        }
                    }
                }
                rf=Values_array[0];
                gf=Values_array[1];
                bf=Values_array[2];
            }else{ 
                console.log("ERROR LINE "+Nb_line+": COLOR parameter 1 requires one of (pen, fill), you wrote "+Array2[1]);
            }   
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE "+Nb_line+": RECTANGLE has 4 parameters, you wrote "+compteur+" parameters");
        }
    }*/
    
    //LOOP:
    if(Array2[0] == "LOOP:"){
        
        if(Array2.length == 2){
            if(!Number.isInteger(parseInt(Array2[1])) && Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): POSITION parameter 1 requires a number or a variable, you wrote "+Array2[1]);
            }else if(Number.isInteger(parseInt(Array2[1]))){
                times=parseInt(Array2[1]) -1;
                LOOP_index=i;
            }else if(Array2[1].charAt(0) == "%"){
                let Loop_int=0;
                for(let k=0;k<Variables_array.length;k+=2){  
                    if(Array2[1].includes(Variables_array[k])){
                        times=parseInt(Variables_array[k+1]) -1;
                        LOOP_index=i;
                        Loop_int=1;
                    }
                }
                if(Loop_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): LOOP has 1 parameters, you wrote "+compteur);
        }
        
         
    }
    //console.log("loop index :" +LOOP_index);
    
    //WHILE:
    if(Array2[0] == "WHILE:"){
        if(Array2.length == 2){
            if(Array2[1].charAt(0) != "%"){
                console.log("ERROR LINE ("+Nb_line+"): POSITION parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(Array2[1].charAt(0) == "%"){
                let Whi_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1].includes(Variables_array[k])){
                        Whi_int=1;
                        if(parseInt(Variables_array[k+1])!=0){
                            times=parseInt(Variables_array[k+1]) -1;
                            LOOP_index=i; 
                        }
                        else{
                            for(let a=i+1;a<Array.length;a++){
                                if(Array[a]=="REPEAT"){
                                    i=a;
                                }
                            }
                        }
                    }
                }
                if(Whi_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): LOOP has 1 parameters, you wrote "+compteur);
        } 
    }

    //REPEAT:
    if(Array2[0] == "REPEAT"){
        if(Array2.length == 1){
            if(LOOP_index == -1){
                console.log("ERROR LINE ("+Nb_line+"): REPEAT and no LOOP")
            }else{
                if(times>0){
                    i=LOOP_index;
                    times--;
                    //console.log("times: "+times)
                }else if(times == 0){
                    LOOP_index=-1;
                }       
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): REPEAT has 0 parameters, you wrote"+compteur);
        }
    }
    
    if(Array2[0]=="REPEAT:"){
        if(Array2.length>1){
            console.log("ERROR LINE ("+Nb_line+"): REPEAT has 0 parameters, you wrote "+(Array2.length-1));
        }
    }
    // IF:
    if(Array2[0]=="IF:"){
        Bool_if=true;            
        if(Array2.length == 2){
            if(Array2[1].charAt(0)!="%"){
                console.log("ERROR LINE ("+Nb_line+"): IF parameter 1 requires a variable, you wrote "+Array2[1])
            }else if(Array2[1].charAt(0)=="%"){
                let No_end=0;
                let If_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1]==Variables_array[k]){
                        If_int=1;
                        //console.log(parseInt(Variables_array[k+1]))
                        if(parseInt(Variables_array[k+1]) == 0){
                             
                            for(let a=i+1;a<Array.length;a++){
                                if(Array[a]=="ELSE"){
                                    Bool_else=true;
                                    i=a;
                                    No_end=1;
                                    break;
                                }
                                if(Array[a]=="END"){
                                    Bool_end=true;
                                    i=a;
                                    No_end=1;
                                    break;
                                }
                            } 
                            
                            
                        }else if(parseInt(Variables_array[k+1]) != 0){

                            for(let a=i+1;a<Array.length;a++){
                                if(Array[a].includes("ELSE")){
                                    Bool_else=false;
                                    No_end=1;
                                    break;
                                }
                                if(Array[a].includes("END")){
                                    Bool_end=true;
                                    No_end=1;
                                    break;
                                }
                            } 
                        }
                    }
                }
                if(No_end==0){
                    console.log("You have IF without END");
                }
                if(If_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): IF has 1 parameters, you wrote"+compteur);
        }
    }
    
    //ELSE:
    if(Array2[0]=="ELSE"){
        if(Array2.length == 1){
            if(Bool_if == true){
                if(Bool_else==true){
                    Bool_else=false;
                    Bool_end=true;
                }
                if(Bool_else==false){
                    for(let a=i+1;a<Array.length;a++){
                        if(Array[a]=="END"){
                            Bool_end=true;
                            i=a;
                            break;
                        }
                    }
                }
            }else if(Bool_if == false){
                console.log("ERROR LINE ("+Nb_line+"): ELSE and no IF")
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): ELSE has 0 parameters, you wrote "+compteur);
        }
    }
    
    //END:
    if(Array2[0]=="END"){
        if(Array2.length == 1){
            if(Bool_if == true && Bool_end == true){
                Bool_if=false;
                Bool_end=false;
            }else if(Bool_if == false && Bool_end == false){
                console.log("ERROR LINE ("+Nb_line+"): END and no IF")
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): END has 0 parameters, you wrote"+compteur);
        }
    }

    //SET:
    if(Array2[0] == "SET:"){
        if(Array2.length == 3){
            if( Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): SET parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(Array2[1].charAt(0) == "%" && Number.isInteger(parseInt(Array2[2])) ){
                Variables_array.push(Array2[1],Array2[2].toString());
            }else if(Array2[1].charAt(0) == "%" && Array2[2].charAt(0) == "%" ){
                let Var_int=0;
                for(let k=0;k<Variables_array.length;k++){
                    if(Array2[2]==Variables_array[k]){
                        Variables_array.push(Array2[1],Variables_array[k+1]);
                        Var_int=1;
                        break;
                    }
                }
                if(Var_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
            }else if(!Number.isInteger(parseInt(Array2[2])) && Array2[1].charAt(0) == "%"){
                console.log("ERROR LINE ("+Nb_line+"): SET parameter 2 requires a number or a variable, you wrote "+Array2[2]);
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): SET has 2 parameters, you wrote "+compteur);
        }
    }

    //ADD
    if(Array2[0] == "ADD:"){
        if(Array2.length == 3){
            if( Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): ADD parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(!Number.isInteger(parseInt(Array2[2])) && Array2[2].charAt(0) != "%"){
                console.log("ERROR LINE ("+Nb_line+"): ADD parameter 2 requires a number or a variable, you wrote "+Array2[2]);
            }else if(Array2[1].charAt(0) == "%" && Number.isInteger(parseInt(Array2[2])) ){
                let ADD_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1]==Variables_array[k]){
                        ADD_int=1;
                        let s:number=parseInt(Variables_array[k+1])+parseInt(Array2[2]);
                        Variables_array[k+1]=s.toString();
                    }
                }
                if(ADD_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                
            }else if(Array2[1].charAt(0) == "%" && Array2[2].charAt(0) == "%" ){
                let ADD_int=0;
                let ADD2_int=0;
                for(let k=0;k<Variables_array.length;k++){
                    if(Array2[1]==Variables_array[k]){
                        ADD_int=1;
                        for(let a=0;a<Variables_array.length;a+=2){
                            if(Array2[2]==Variables_array[a]){
                                ADD2_int=1;
                                let s:number=parseInt(Variables_array[k+1])+parseInt(Variables_array[a+1]);
                                Variables_array[k+1]=s.toString();
                            }
                        }
                    }
                }
                if(ADD_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                if(ADD2_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[2]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): ADD has 2 parameters, you wrote "+compteur);
        }
    }

    //SUB:
    if(Array2[0] == "SUB:"){
        if(Array2.length == 3){
            if( Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): SUB parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(!Number.isInteger(parseInt(Array2[2])) && Array2[2].charAt(0) != "%"){
                console.log("ERROR LINE ("+Nb_line+"): SUB parameter 2 requires a number or a variable, you wrote "+Array2[2]);
            }else if(Array2[1].charAt(0) == "%" && Number.isInteger(parseInt(Array2[2])) ){
                let Sub_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1]==Variables_array[k]){
                        Sub_int=1;
                        let s:number=parseInt(Variables_array[k+1])-parseInt(Array2[2]);
                        Variables_array[k+1]=s.toString();
                    }
                }
                if(Sub_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                
            }else if(Array2[1].charAt(0) == "%" && Array2[2].charAt(0) == "%" ){
                let Sub_int=0;
                let Sub2_int=0;
                for(let k=0;k<Variables_array.length;k++){
                    if(Array2[1]==Variables_array[k]){
                        Sub_int=1;
                        for(let a=0;a<Variables_array.length;a+=2){
                            if(Array2[2]==Variables_array[a]){
                                Sub2_int=1;
                                let s:number=parseInt(Variables_array[k+1])-parseInt(Variables_array[a+1]);
                                Variables_array[k+1]=s.toString();
                            }
                        }
                    }
                }
                if(Sub_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                if(Sub2_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[2]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): SUB has 2 parameters, you wrote "+compteur);
        }
    }

    //MUL
    if(Array2[0] == "MUL:"){
        if(Array2.length == 3){
            if( Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): MUL parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(!Number.isInteger(parseInt(Array2[2])) && Array2[2].charAt(0) != "%"){
                console.log("ERROR LINE ("+Nb_line+"): MUL parameter 2 requires a number or a variable, you wrote "+Array2[2]);
            }else if(Array2[1].charAt(0) == "%" && Number.isInteger(parseInt(Array2[2])) ){
                let Mul_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1]==Variables_array[k]){
                        Mul_int=1;
                        let s:number=parseInt(Variables_array[k+1])*parseInt(Array2[2]);
                        Variables_array[k+1]=s.toString();
                    }
                }
                if(Mul_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                
            }else if(Array2[1].charAt(0) == "%" && Array2[2].charAt(0) == "%" ){
                let Mul_int=0;
                let Mul2_int=0;
                for(let k=0;k<Variables_array.length;k++){
                    if(Array2[1]==Variables_array[k]){
                        Mul_int=1;
                        for(let a=0;a<Variables_array.length;a+=2){
                            if(Array2[2]==Variables_array[a]){
                                Mul2_int=1;
                                let s:number=parseInt(Variables_array[k+1])*parseInt(Variables_array[a+1]);
                                Variables_array[k+1]=s.toString();
                            }
                        }
                    }
                }
                if(Mul_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                if(Mul2_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[2]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): MUL has 2 parameters, you wrote "+compteur);
        }
    }

    //DIV
    if(Array2[0] == "DIV:"){
        if(Array2.length == 3){
            if( Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): DIV parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(!Number.isInteger(parseInt(Array2[2])) && Array2[2].charAt(0) != "%"){
                console.log("ERROR LINE ("+Nb_line+"): DIV parameter 2 requires a number or a variable, you wrote "+Array2[2]);
            }else if(Array2[1].charAt(0) == "%" && Number.isInteger(parseInt(Array2[2])) ){
                let Div_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1]==Variables_array[k]){
                        Div_int=1;
                        let s:number=parseInt(Variables_array[k+1])/parseInt(Array2[2]);
                        Variables_array[k+1]=s.toString();
                    }
                }
                if(Div_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                
            }else if(Array2[1].charAt(0) == "%" && Array2[2].charAt(0) == "%" ){
                let Div_int=0;
                let Div2_int=0;
                for(let k=0;k<Variables_array.length;k++){
                    if(Array2[1]==Variables_array[k]){
                        Div_int=1;
                        for(let a=0;a<Variables_array.length;a+=2){
                            if(Array2[2]==Variables_array[a]){
                                Div2_int=1;
                                let s:number=parseInt(Variables_array[k+1])/parseInt(Variables_array[a+1]);
                                Variables_array[k+1]=s.toString();
                            }
                        }
                    }
                }
                if(Div_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                if(Div2_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[2]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): DIV has 2 parameters, you wrote "+compteur);
        }
    }

    //IDIV
    if(Array2[0] == "IDIV:"){
        if(Array2.length == 3){
            if( Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): IDIV parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(!Number.isInteger(parseInt(Array2[2])) && Array2[2].charAt(0) != "%"){
                console.log("ERROR LINE ("+Nb_line+"): IDIV parameter 2 requires a number or a variable, you wrote "+Array2[2]);
            }else if(Array2[1].charAt(0) == "%" && Number.isInteger(parseInt(Array2[2])) ){
                let Idiv_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1]==Variables_array[k]){
                        Idiv_int=1;
                        let s:number=parseInt(Variables_array[k+1])/Math.round(parseInt(Array2[2]));
                        Variables_array[k+1]=s.toString();
                    }
                }
                if(Idiv_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                
            }else if(Array2[1].charAt(0) == "%" && Array2[2].charAt(0) == "%" ){
                let Idiv_int=0;
                let Idiv2_int=0;
                for(let k=0;k<Variables_array.length;k++){
                    if(Array2[1]==Variables_array[k]){
                        Idiv_int=1;
                        for(let a=0;a<Variables_array.length;a+=2){
                            if(Array2[2]==Variables_array[a]){
                                Idiv2_int=1;
                                let s:number=parseInt(Variables_array[k+1])/Math.round(parseInt(Variables_array[a+1]));
                                Variables_array[k+1]=s.toString();
                            }
                        }
                    }
                }
                if(Idiv_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                if(Idiv2_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[2]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE ("+Nb_line+"): IDIV has 2 parameters, you wrote "+compteur);
        }
    }

    //MOD
    if(Array2[0] == "MOD:"){
        if(Array2.length == 3){
            if( Array2[1].charAt(0) != "%" ){
                console.log("ERROR LINE ("+Nb_line+"): MOD parameter 1 requires a variable, you wrote "+Array2[1]);
            }else if(!Number.isInteger(parseInt(Array2[2])) && Array2[2].charAt(0) != "%"){
                console.log("ERROR LINE ("+Nb_line+"): MOD parameter 2 requires a number or a variable, you wrote "+Array2[2]);
            }else if(Array2[1].charAt(0) == "%" && Number.isInteger(parseInt(Array2[2])) ){
                let Mod_int=0;
                for(let k=0;k<Variables_array.length;k+=2){
                    if(Array2[1]==Variables_array[k]){
                        Mod_int=1;
                        let s:number=parseInt(Variables_array[k+1])%parseInt(Array2[2]);
                        Variables_array[k+1]=s.toString();
                    }
                }
                if(Mod_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                
            }else if(Array2[1].charAt(0) == "%" && Array2[2].charAt(0) == "%" ){
                let Mod_int=0;
                let Mod2_int=0;
                for(let k=0;k<Variables_array.length;k++){
                    if(Array2[1]==Variables_array[k]){
                        Mod_int=1;
                        for(let a=0;a<Variables_array.length;a+=2){
                            if(Array2[2]==Variables_array[a]){
                                Mod2_int=1;
                                let s:number=parseInt(Variables_array[k+1])%parseInt(Variables_array[a+1]);
                                Variables_array[k+1]=s.toString();
                            }
                        }
                    }
                }
                if(Mod_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[1]);
                }
                if(Mod2_int=0){
                    console.log("ERROR LINE ("+Nb_line+"): Undefined variable "+Array[2]);
                }
            }
        }else{
            let compteur=0;
            for(let j=1;j<Array2.length;j++){
                compteur++;
            }
            console.log("ERROR LINE "+Nb_line+": MOD has 2 parameters, you wrote "+compteur);
        }
    }
    
}

//console.log(x+" "+y);
let svg_code:string;
//console.log(svg_array.join(" "));
svg_code="<svg width=\"1024\" height=\"768\">"+svg_array.join(" ")+"</svg>";
fs.writeFileSync(file2,svg_code);

