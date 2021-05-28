
define(function(require, module, exports){
    
    var regex = /\{/gi;
    var emojisToFindRegex = /[^{}]*(?=\})/g;
    
    var Emoji = function(input){
        return Emoji.replaceVerbose(input);
    };
    
    Emoji.replaceVerbose = function(input){
        if(Emoji.checkStart(input) && input.includes("_emoji")){
            var emojisToFind = input.match(emojisToFindRegex);
            var foundEmojis = [];
       
            emojisToFind.forEach(emoji=>{
           
                emoji = emoji.split("_emoji").join("");
                foundEmojis.push(Emoji.list[emoji]);
            });
        
            for(var i = 0; i < emojisToFind.length; i++) {
                input = input.replace(new RegExp('{' + emojisToFind[i] + '}', 'gi'), foundEmojis[i]);
            
            }
        }
        return input;
    };
    
    Emoji.list = {
        ok: "👍",
        happy: "😁",
        smiley: "😀",
        heart: "❤️",
        disapppointed: "🙄",
        wave: "👋",
        angry: "😡",
        rofl: "🤣",
        joy: "😂",
        blush: "😊",
        music: "🎵",
        read: "📘",
        sad: "😢",
        wink: "😉",
        crazy: "🤪"
    };
    
    Emoji.checkStart = function(input){
        return regex.test(input);
    };
    
    return Emoji
});
