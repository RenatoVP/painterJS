const painter = new PainterJS("myPaintCanvas", 800, 400);
const ctx = painter.getContext2D();
const e = painter.events;

const vector2 = new Vector2D(100, 100);
requestAnimationFrame(function animate(){
    painter.fillAll("red");

    if(e.cursorIsPressed){
        painter.begin();
        painter.rect(e.cursorXPressed, e.cursorYPressed, e.cursorW, e.cursorH);
        painter.fill('blue');
        painter.close();
    }

    painter.begin();
    painter.font("30px");
    painter.fill("white");
    painter.text("CursorW: " + e.cursorW + " CursorH: " + e.cursorH, 100, 100);
    painter.close();

    requestAnimationFrame(animate);
});