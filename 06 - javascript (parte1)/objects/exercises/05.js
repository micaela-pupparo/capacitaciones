//cuando queremos crear un nuevo objeto de Post, no hace falta
//pasarle las views, los comments y si es live o no porque
//al principio estan inicializados en cero o estan vacios

//mientras mas parametros tenga tu objeto mas dificil es de usarlo
function Post(title, body, author) {
    this.title = title;
    this.body = body;
    this.author = author;
    this.views = 0 
    this.comments = [];
    this.isLive = false;

}