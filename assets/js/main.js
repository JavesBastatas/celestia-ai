define(function(require, module, exports){
    
    var DIR = '/assets/';
    var JS_DIR = DIR+'js/'
    var JSON_DIR = DIR+'json/'
    
    define([
        
        JS_DIR+'lib/console',
        JS_DIR+'lib/nlp',
        JS_DIR+'chatbot',
        JS_DIR+'chatbot-ui',
        JS_DIR+'plugins/Emojis',
        
    ], (myconsole, NLP, Celestia, UI, Emoji)=> {
        
        NLP = nlpjs;
        
        myconsole.init();
        
        Celestia.setup(NLP);
        Celestia.init(location.origin+'/'+JSON_DIR+'/dataset.json?v='+Math.random()*696969);
        Celestia.onChat = input => {
            console.log("Input: "+input)
            
            input = Emoji(input);
            UI.addMessage(input, "user");
        };
        Celestia.onReply = answer =>{
            console.log("Output: "+answer)
            
            answer = Emoji(answer);
            UI.addMessage(answer, "bot");
        };
        
        UI.setup(Celestia, {
            parent: "#messages-area",
            button: "#send",
            input: "#message-input"
        });
        
        var loading = document.querySelector("#messages-loading");
        
        setTimeout(()=>{
            
            loading.style.display = "none"
            UI.addMessage("Hi there! Im Celestia! An AI Powered Chatbot. Say hi!", "bot")
            
        }, 1000);
        
    });
    
});
