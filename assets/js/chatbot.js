define(function(require, module, exports){
    
    /**
     * Celestia - an NLP-powered AI Chatbot
     * Project from JavesCodingLab's Experiments Collection
     * 
     * @author Javes Bastatas (Github: @JavesBastatas)
     * @copyright JavesCodingLab
     */
    
    "use strict";
    
    var NLP = void 0;
    var Celestia = {
        settings: {
            lang: "en",
            autoSave: false
        },
        onIntent: ()=>{},
        onReply: ()=>{},
        onChat: ()=>{},
        plugins: []
    };
    
    // This will check if NLP is set, otherwise throws an Exception
    Celestia.checkNLP = function(){
        if(NLP && this.nlp) return true;
        else throw new Error("NLP is still not set");
    };
    
    // Setups the NLP and Celestia, the bot
    Celestia.setup = function(NLPJS){
         
        
        NLP = NLPJS;
        
        this.container = NLP.containerBootstrap();
        this.container.register("fs", NLP.fs);
        this.container.use(NLP.Nlp);
        this.container.use(NLP.LangEn);
        this.nlp = this.container.get("nlp");
        this.nlp.onIntent = this.onIntent;
        this.nlp.settings.autoSave = this.settings.autoSave;
    };
    
    
    Celestia.onIntent = function(nlp, input) {
            
            if (input.intent === 'greetings.hello') {
                const hours = new Date().getHours();
                const output = input;
                if (hours < 12) {
                    output.answer = input.answer + " " + '🌄Good morning!';
                } else if (hours < 17) {
                    output.answer = input.answer + " " + '🌇Good afternoon!';
                } else {
                    output.answer = input.answer + " " + '🌒Good evening!';
                }
                
                
                return output;
            }
            
            return input;
        };

    
    Celestia.init = async function(dataset){
        this.checkNLP();
        
       await this.addDataset(dataset);
       await this.reTrain();
    };
    
    Celestia.addDataset = async function(dataset){
        this.checkNLP();
        await this.nlp.addCorpus(dataset);
    };
    
    Celestia.reTrain = async function(){
        this.checkNLP();
        await this.nlp.train();
    };
    
    Celestia.process = async function (input){
        this.checkNLP();
        return await this.nlp.process(this.settings.lang, input);
    };
    
    Celestia.chat = async function(input){
        this.checkNLP();
        this.onChat(input);
        
        var response = await this.process(input);
        console.log(response)
        await this.onReply(response.answer);
        
        return response.answer;
    };
    
    
    return Celestia;
});
