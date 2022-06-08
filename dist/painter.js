class PainterJS {
    constructor(id, width, height){
        this.id = id;
        this.width = width;
        this.height = height;
        this.canvas = "";
        this.events = {};
        this.onInit();
        this.onEvents();
    }

    onInit(){
        this.canvas = document.createElement('canvas');
        this.canvas.id = this.id;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);
    }

    onEvents(){
        const canvas = document.getElementById(this.id);

        //Eventos de mouse
        canvas.addEventListener('mousedown', e => {
            this.events.cursorIsPressed = true;
            this.events.cursorXPressed = e.clientX - canvas.getBoundingClientRect().left;    //Obtiene la posicion X pulsada
            this.events.cursorYPressed = e.clientY - canvas.getBoundingClientRect().top;     //Obtiene la posicion Y pulsada
        });

        canvas.addEventListener('mousemove', e => {
            this.events.cursorX = e.clientX - canvas.getBoundingClientRect().left;       //Obtiene la posicion X actual
            this.events.cursorY = e.clientY - canvas.getBoundingClientRect().top;        //Obtiene la posicion Y actual
            this.events.cursorW = Math.round(this.events.cursorX - this.events.cursorXPressed);
            this.events.cursorH = Math.round(this.events.cursorY - this.events.cursorYPressed);
        });

        canvas.addEventListener('mouseup', () => {
            this.events.cursorIsPressed = false;
        });

        //Eventos de teclado
        window.addEventListener('keydown', e => {
            this.events.keyIsPressed = true;
            this.events.key = e.code;
        });

        window.addEventListener('keyup', () => {
            this.events.keyIsPressed = false;
        });
    }

    getContext2D(){
        return this.canvas.getContext("2d");
    }

    //Paths
    circle(x, y, r){
        this.canvas.getContext("2d").arc(x, y, r, 0, 2 * Math.PI);
    }

    rect(x, y, w, h){
        this.canvas.getContext("2d").rect(x, y, w, h);
    }

    triangle(x1, y1, x2, y2, x3, y3){
        const ctx = this.canvas.getContext("2d");
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
    }

    //Line with moveTo
    line(x1, y1, x2, y2){
        const ctx = this.canvas.getContext("2d");
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }

    //Line without moveTo
    line(x, y){
        this.canvas.getContext("2d").lineTo(x, y);
    }

    //MoveTo
    move(x, y){
        this.canvas.getContext("2d").moveTo(x, y);
    }


    //Utils
    fillAll(color){
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fill();
        ctx.closePath();
    }

    begin(){
        this.canvas.getContext("2d").beginPath();
    }

    close(){
        this.canvas.getContext("2d").closePath();
    }

    stroke(color){
        const ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    fill(color){
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fill();
    }

    //Textos
    textAlign(align){
        this.canvas.getContext("2d").textAlign = align;
    }

    font(size, fontStyle = "Arial"){
        this.canvas.getContext("2d").font = size + " " + fontStyle;
    }

    text(text, x, y){
        this.canvas.getContext("2d").fillText(text, x, y);
    }
}